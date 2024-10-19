import CourseCategory from "../models/courseCategoryModel.js";
import Course from "../models/courseModel.js";
import CoursePart from "../models/coursePartModel.js";
import CourseSection from "../models/courseSectionModel.js";

// ! need to delete this
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

export const createCourse = async (req, res, next) => {

    const { user } = req;
    const teacherId = user.id;
    const role = user.role;

    if (role == "teacher") {
        const { title, description, price, categoryId } = req.body;

        if (!title || !description || !price || !categoryId || !teacherId) {
            return res.status(400).json({ message: "All fields are required" });
        } else {
            try {
                const course = new Course({ title, description, price, categoryId, teacherId });
                await course.save();
                return res.status(200).json({ message: "Course created successfully", course });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" + role });
    }

}

export const showCourseById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const course = await Course.findOne({ _id: id });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // send course sections
        const courseSections = await CourseSection.find({ courseId: id });

        const sectionIds = courseSections.map(section => section._id);

        const courseParts = await CoursePart.find({ sectionId: { $in: sectionIds } });

        return res.status(200).json({ course, courseSections, courseParts });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const showCoursesByTeacherId = async (req, res, next) => {
    const teacherId = req.params.teacherId;

    try {
        const courses = await Course.find({ teacherId: teacherId });
        return res.status(200).json({ courses });
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

                // update
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
                        // upload.single(videoFile);
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