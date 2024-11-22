import CourseCategory from "../models/courseCategoryModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import CoursePart from "../models/coursePartModel.js";
import CourseSection from "../models/courseSectionModel.js";
import PurchasedCourse from "../models/purchasedCourseModel.js";
import jwt from "jsonwebtoken";
import WatchHistory from "../models/watchHistoryModel.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

// ! create categories
export const createCategory = () => {

    // ! need to delete this
    const categories = [
        "Web Development",
        "Mobile App Development",
        "Data Science",
        "Artificial Intelligence",
        "Cyber Security",
        "Database Management",
        "Networking",
        "Computer Systems",
        "Algorithms and Data Structures",
        "Software Engineering"
    ];

    categories.map(category => {
        const newCategory = new CourseCategory({ name: category });
        newCategory.save();
    }
    )
}

export const showCourseCategories = async (req, res, next) => {
    try {
        const categories = await CourseCategory.find();
        return res.status(200).json({ categories });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const addCourseImageUrl = (item) => {
    let baseUrl = "http://127.0.0.1:" + PORT + "/api/v1/image/courseImage/";
    if (item.imageUrl) {
        // Prepend the base URL to the existing imageUrl
        item.imageUrl = `${baseUrl}${item.imageUrl}`;
    } else {
        // Add the default image URL if imageUrl does not exist
        item.imageUrl = `${baseUrl}default.jpg`;
    }
}

const addCourseTeacherImageUrl = (teacher) => {
    let baseUrl = "http://127.0.0.1:" + PORT + "/api/v1/image/userImage/";
    if (teacher.imageUrl) {
        // Prepend the base URL to the existing imageUrl
        teacher.imageUrl = `${baseUrl}${teacher.imageUrl}`;
    } else {
        // Add the default image URL if imageUrl does not exist
        teacher.imageUrl = `${baseUrl}default.png`;
    }
}

const addAdditionalDetailsToCourse = async (course) => {
    const courseCategory = await CourseCategory.findById(course.categoryId);
    const teacher = await User.findById(course.teacherId);

    addCourseTeacherImageUrl(teacher);
    addCourseImageUrl(course);

    const { token, createdAt, password, role, ...teacherOthers } = teacher._doc;

    return {
        ...course._doc, categoryName: courseCategory.name, teacher: teacherOthers
    }
}

export const showCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();

        const updatedCourses = await Promise.all(courses.map((course) => {
            return addAdditionalDetailsToCourse(course);
        }));

        return res.status(200).json({ courses: updatedCourses });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const createCourse = async (req, res, next) => {

    const { user } = req;
    const teacherId = user.id;
    const role = user.role;

    if (role == "teacher") {
        const { title, description, price, categoryId } = req.body;
        const courseImage = req.file;

        if (!title || !description || !price || !categoryId || !teacherId || !courseImage) {
            return res.status(400).json({ message: "All fields are required" });
        } else {
            try {
                const course = new Course({ title, description, price, categoryId, teacherId, imageUrl: courseImage.filename });
                await course.save();
                return res.status(200).json({ message: "Course created successfully", course });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }

}



export const showCourseById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const updatedCourse = await addAdditionalDetailsToCourse(course);

        const courseSections = await CourseSection.find({ courseId: id });

        const sectionIds = courseSections.map(section => section._id);

        const courseParts = await CoursePart.find({ sectionId: { $in: sectionIds } });

        let isPurchased = false;
        if (req.cookies.access_token) {
            const user = verifyToken(req.cookies.access_token)
            if (user) {
                isPurchased = await isUserPurchasedCourse(user.id, id)
            }
        }

        return res.status(200).json({ course: updatedCourse, courseSections, courseParts, isPurchased });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const isUserPurchasedCourse = async (userId, courseId) => {
    const purchasedCourse = await PurchasedCourse.findOne({ courseId: courseId, userId: userId });
    if (purchasedCourse) {
        return true;
    }
    return false;
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

export const showCoursesByTeacherId = async (req, res, next) => {
    const teacherId = req.params.teacherId;

    try {
        const courses = await Course.find({ teacherId: teacherId });

        const categories = await CourseCategory.find();

        const updatedCourses = await Promise.all(courses.map((course) => {
            return addAdditionalDetailsToCourse(course);
        }));

        return res.status(200).json({ courses: updatedCourses, categories });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
export const createCourseSection = async (req, res, next) => {

    const { user } = req;
    const teacherId = user.id;

    const { title, courseId } = req.body;

    // check is course is created by teacher
    const course = await Course.findOne({ _id: courseId });
    if (course.teacherId != teacherId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !courseId) {
        return res.status(400).json({ message: "All fields are required" });
    } else {
        try {
            const courseSection = new CourseSection({ title, courseId });
            await courseSection.save();
            return res.status(201).json({ message: "Course section created successfully", courseSection });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

export const createCoursePart = async (req, res, next) => {

    const { user } = req;
    const teacherId = user.id;

    const { title, description, sectionId } = req.body;
    const videoFile = req.file;

    if (!title || !description || !videoFile || !sectionId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // check is course is created by teacher
        const courseSection = await CourseSection.findOne({ _id: sectionId });

        if (courseSection) {
            const courseId = await Course.findOne({ _id: courseSection.courseId });
            if (courseId.teacherId != teacherId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }

        const coursePart = new CoursePart({ title, description, videoUrl: videoFile.filename, sectionId });
        await coursePart.save();

        return res.status(201).json({ message: "Course part created successfully", coursePart });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

export const updateCourse = async (req, res, next) => {

    const { user } = req;
    const teacherId = user.id;
    const role = user.role;

    if (role == "teacher") {
        const { title, description, price, categoryId, courseId } = req.body;

        if (!title || !description || !price || !categoryId || !teacherId || !courseId) {
            return res.status(400).json({ message: "All fields are required" });
        } else {
            try {

                // check is course is created by teacher
                const course = await Course.findOne({ _id: courseId });
                if (course.teacherId != teacherId) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                await Course.updateOne({ _id: courseId }, { $set: { title, description, price, categoryId } });
                return res.status(200).json({ message: "Course updated successfully" });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" + role });
    }
}

// update course section
export const updateSection = async (req, res, next) => {
    const { user } = req;
    const teacherId = user.id;

    const { id, title } = req.body;

    if (!id || !title) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // get section
    const section = await CourseSection.findById(id);

    if (section) {
        const course = await Course.findById(section.courseId);
        if (course) {
            try {
                if (course.teacherId != teacherId) {
                    return res.status(401).json({ message: "Unauthorized" + course.teacherId });
                }

                await CourseSection.updateOne({ _id: id }, { $set: { title } });
                return res.status(200).json({ message: "Section updated successfully" });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        } else {
            return res.status(404).json({ message: "Course not found" });
        }
    } else {
        return res.status(404).json({ message: "Section not found" });
    }
}

export const updatePart = async (req, res, next) => {
    const { user } = req;
    const teacherId = user.id;

    const { id, title, description } = req.body;
    const videoFile = req.file;
    if (!id || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const part = await CoursePart.findById(id);
        if (part) {
            const section = await CourseSection.findOne({ _id: part.sectionId });
            if (section) {
                const course = await Course.findOne({ _id: section.courseId });
                if (course) {
                    if (course.teacherId != teacherId) {
                        return res.status(401).json({ message: "Unauthorized" });
                    }

                    let videoUrl = part.videoUrl;
                    if (videoFile) {
                        videoUrl = videoFile.filename;
                    }

                    await CoursePart.updateOne({ _id: id }, { $set: { title, description, videoUrl } });
                    return res.status(200).json({ message: "Course updated successfully" });

                } else {
                    return res.status(404).json({ message: "Course not found" });
                }
            } else {
                return res.status(404).json({ message: "Section not found" });
            }
        } else {
            return res.status(404).json({ message: "Part not found" });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

// Delete routes
export const deleteSection = async (req, res, next) => {
    const sectionId = req.params.id;

    const { user } = req;
    const teacherId = user.id;

    // get section
    const section = await CourseSection.findById(sectionId);

    if (section) {
        const course = await Course.findById(section.courseId);
        if (course) {

            if (course.teacherId != teacherId) {
                return res.status(401).json({ message: "Unauthorized" + course.teacherId });
            }

            await CoursePart.deleteMany({ sectionId: sectionId });
            await CourseSection.deleteOne({ _id: sectionId });
            return res.status(200).json({ message: "Section deleted successfully" });

        } else {
            return res.status(404).json({ message: "Course not found" });
        }
    } else {
        return res.status(404).json({ message: "Section not found" });
    }
}

export const deletePart = async (req, res, next) => {
    const partId = req.params.id;

    const { user } = req;
    const teacherId = user.id;

    // get part
    const part = await CoursePart.findById(partId);

    if (part) {
        const section = await CourseSection.findById(part.sectionId);
        if (section) {
            const course = await Course.findById(section.courseId);
            if (course) {
                if (course.teacherId != teacherId) {
                    return res.status(401).json({ message: "Unauthorized" + course.teacherId });
                }

                await CoursePart.deleteOne({ _id: partId });
                return res.status(200).json({ message: "Part deleted successfully" });
            } else {
                return res.status(404).json({ message: "Course not found" });
            }
        } else {
            return res.status(404).json({ message: "Course section not found" });
        }
    } else {
        return res.status(404).json({ message: "Course part not found" });
    }
}

export const deleteCourse = async (req, res, next) => {
    const courseId = req.params.id;

    const { user } = req;
    const teacherId = user.id;

    const course = await Course.findById(courseId);

    if (course) {
        if (course.teacherId != teacherId) {
            return res.status(401).json({ message: "Unauthorized" + course.teacherId });
        }

        const sections = await CourseSection.find({ courseId: course._id });

        for (const section of sections) {
            await CoursePart.deleteMany({ sectionId: { $in: section._id } });
            await CourseSection.deleteOne({ _id: section._id });
        };

        await Course.deleteOne({ _id: course._id });
        return res.status(200).json({ message: "Course deleted successfully" });
    } else {
        return res.status(404).json({ message: "Course part not found" });
    }
}

export const entrollCourse = async (req, res, next) => {
    const { courseId } = req.params;
    const { user } = req;
    const userId = user.id;

    try {
        if (!courseId || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check is this course purchased
        const purchasedCourse = await PurchasedCourse.findOne({ courseId, userId });
        if (!purchasedCourse) {
            return res.status(404).json({ message: "Not Purchased" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        addAdditionalDetailsToCourse(course);

        const courseSections = await CourseSection.find({ courseId });

        const sectionIds = courseSections.map(section => section._id);

        const courseParts = await CoursePart.find({ sectionId: { $in: sectionIds } });

        let watchHistoryParts = await WatchHistory.find({ coursePartId: { $in: courseParts.map(part => part._id) }, userId });

        if (!watchHistoryParts) {
            return res.status(404).json({ message: "Course part not found" });
        }

        const updatedWatchHistoryParts = watchHistoryParts.map(watchPart => {
            const matchingCoursePart = courseParts.find(coursePart => coursePart._id.toString() === watchPart.coursePartId.toString());
            if (matchingCoursePart) {
                return { ...watchPart._doc, title: matchingCoursePart.title, description: matchingCoursePart.description, sectionId: matchingCoursePart.sectionId };
            }
        });

        let isPurchased = true;

        return res.status(200).json({ course, courseSections, watchHistoryParts: updatedWatchHistoryParts, isPurchased });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}