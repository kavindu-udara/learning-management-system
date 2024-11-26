import apiClient from "@/axios/axios";
import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import CreateSection from "@/components/course/CreateSection";
import CreatePart from "@/components/course/CreatePart";
import SingleCourseHeroSection from "@/components/course/SingleCourseHeroSection";
import CreateCourseDialog from "@/components/course/CreateCourseDialog";
import ConfirmationDialog from "@/components/alerts/ConfirmationDialog";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";

type Teacher = {
  fname: string;
  lname: string;
  imageUrl: string;
};

type Course = {
  title: string;
  categoryName: string;
  description: string;
  price: number;
  imageUrl: string;
  teacher: Teacher;
};

type Part = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  sectionId: string;
  isLocked: boolean;
};

type Sections = {
  _id: string;
  title: string;
  courseId: string;
  parts: Part[];
}[];

const EditCourse: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState<Course>({
    title: "",
    categoryName: "",
    description: "",
    price: 0,
    imageUrl: "",
    teacher: {
      fname: "",
      lname: "",
      imageUrl: "",
    },
  });
  const [courseSections, setCourseSections] = useState<Sections>([]);

  const [sectionName, setSectionName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [currentSectionId, setCurrentSectionId] = useState<string>("");
  const [currentPartId, setCurrentPartId] = useState<string>("");

  //course part
  const [partTitle, setPartTitle] = useState<string>("");
  const [partDescription, setPartDescription] = useState<string>("");
  const [partFile, setPartFile] = useState<any>(null);

  // course dtails
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  const createSectionButtonRef = useRef<HTMLButtonElement>(null);
  const editSectionButtonRef = useRef<HTMLButtonElement>(null);

  const createPartButtonRef = useRef<HTMLButtonElement>(null);
  const editPartButtonRef = useRef<HTMLButtonElement>(null);

  const editCourseDetailsButtonRef = useRef<HTMLButtonElement>(null);
  const deleteCourseButtonRef = useRef<HTMLButtonElement>(null);
  const deleteSecConfirmDialogRef = useRef<HTMLButtonElement>(null);
  const deletePartConfirmDialogRef = useRef<HTMLButtonElement>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleAddPartDialog = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    createPartButtonRef.current?.click();
  };

  const handlePartFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setPartFile(file);
    }
  };

  const handleCourseEditButton = () => {
    editCourseDetailsButtonRef.current?.click();
  };

  const loadCourseCategories = async () => {
    apiClient
      .get(`/course/categories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const loadCourseData = () => {
    apiClient
      .get(`/course/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        setCourseSections(res.data.course.sections);

        // fill edit course values
        setCourseTitle(res.data.course.title);
        setCourseDescription(res.data.course.description);
        setCoursePrice(res.data.course.price);
        setCategoryId(res.data.course.categoryId);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/teacher");
      });
  };

  const createCourseSection = () => {
    setIsSaving(true);
    if (sectionName) {
      apiClient
        .post(`/course/create-section`, {
          title: sectionName,
          courseId: id,
        })
        .then((res) => {
          toast.success(res.data.message);
          loadCourseData();
          setSectionName("");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Section name is required");
    }
    setIsSaving(false);
  };

  const createCoursePart = () => {
    setIsSaving(true);
    apiClient
      .post(
        "/course/create-part",
        {
          title: partTitle,
          description: partDescription,
          sectionId: currentSectionId,
          videoFile: partFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        loadCourseData();
        setIsSaving(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsSaving(false);
      });
  };

  const updateCourse = () => {
    setIsSaving(true);
    if (courseTitle && courseDescription && coursePrice && categoryId) {
      apiClient
        .put(`/course/${id}`, {
          title: courseTitle,
          description: courseDescription,
          price: coursePrice,
          categoryId,
          courseId: id,
        })
        .then((res) => {
          toast.success(res.data.message);
          loadCourseData();
          setIsSaving(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsSaving(false);
        });
    }
  };

  const deleteCourseSection = () => {
    if (currentSectionId !== "") {
      apiClient
        .delete(`/course/section/${currentSectionId}`)
        .then((res) => {
          toast.success(res.data.message);
          loadCourseData();
          setCurrentSectionId("");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    setCurrentSectionId("");
  };

  const handleDeletesectionButton = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    deleteSecConfirmDialogRef.current?.click();
  };

  const deleteCoursePart = () => {
    if (currentPartId !== "") {
      apiClient
        .delete(`/course/part/${currentPartId}`)
        .then((res) => {
          toast.success(res.data.message);
          //
          loadCourseData();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    setCurrentPartId("");
  };

  const handleDeletePartButton = (partId: string) => {
    setCurrentPartId(partId);
    deletePartConfirmDialogRef.current?.click();
  };

  const updateCourseSection = () => {
    if (currentSectionId !== "") {
      setIsSaving(true);
      apiClient
        .put(`/course/section/${currentSectionId}`, {
          id: currentSectionId,
          title: sectionName,
        })
        .then((res) => {
          toast.success(res.data.message);
          loadCourseData();
          setIsSaving(false);
          editSectionButtonRef.current?.click();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsSaving(false);
        });
    }
    setIsSaving(false);
    setCurrentSectionId("");
    setSectionName("");
  };

  const handleEditSectionButton = (section: { _id: string; title: string }) => {
    setCurrentSectionId(section._id);
    setSectionName(section.title);
    editSectionButtonRef.current?.click();
  };

  const updateCoursePart = async () => {
    apiClient
      .post(
        `/course/update-part/${currentPartId}`,
        {
          id: currentPartId,
          title: partTitle,
          description: partDescription,
          videoFile: partFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        loadCourseData();
        editPartButtonRef.current?.click();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    setCurrentPartId("");
    setPartTitle("");
    setPartDescription("");
    setPartFile(null);
  };

  const handleEditPartButton = (part: {
    _id: string;
    title: string;
    description: string;
  }) => {
    setCurrentPartId(part._id);
    setPartTitle(part.title);
    setPartDescription(part.description);
    setPartFile(null);
    editPartButtonRef.current?.click();
  };

  const deleteCourse = async () => {
    apiClient
      .delete(`/course/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/teacher");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleCourseDeleteButton = () => {
    deleteCourseButtonRef.current?.click();
  };

  useEffect(() => {
    loadCourseData();
    loadCourseCategories();
  }, []);

  return (
    <>
      <Header />

      <SingleCourseHeroSection
        category={course?.categoryName}
        title={course?.title}
        description={course?.description}
        price={course?.price}
        onClickFunc={handleCourseEditButton}
        deleteBtnFunc={handleCourseDeleteButton}
        imageUrl={course?.imageUrl}
        teacherName={course?.teacher?.fname}
        teacherImage={course?.teacher?.imageUrl}
        isEditable={true}
      />

      <div className="flex justify-center">
        <div className="container mt-5">
          <CourseTabs />

          <div>
            <div className="flex flex-wrap items-center gap-5">
              <div className="text-xl font-bold my-5">Sections</div>
              <span
                onClick={() => createSectionButtonRef.current?.click()}
                className="bg-[#EFF4FF] p-2 cursor-pointer text-[#2563EB]"
              >
                <FaPlus />
              </span>
            </div>

            <CourseContentSectionsAccordion
              sections={courseSections}
              handleEditSectionButton={handleEditSectionButton}
              handleDeletesectionButton={handleDeletesectionButton}
              handleAddPartDialog={handleAddPartDialog}
              handleEditPartButton={handleEditPartButton}
              handleDeletePartButton={handleDeletePartButton}
              isEditable
            />
          </div>
        </div>
      </div>

      {/* create section dialog */}
      <CreateSection
        buttonRef={createSectionButtonRef}
        inputValue={sectionName}
        setInputValue={setSectionName}
        isSaving={isSaving}
        onClickFunc={createCourseSection}
      />
      {/* edit section dialog */}
      <CreateSection
        buttonRef={editSectionButtonRef}
        inputValue={sectionName}
        setInputValue={setSectionName}
        isSaving={isSaving}
        onClickFunc={updateCourseSection}
      />

      {/* create part dialog */}
      <CreatePart
        buttonRef={createPartButtonRef}
        nameValue={partTitle}
        setNameValue={setPartTitle}
        descriptionValue={partDescription}
        setDescriptionValue={setPartDescription}
        handlePartFileChange={handlePartFileChange}
        isSaving={isSaving}
        onClickFunc={createCoursePart}
      />

      {/* ? edit part dialog */}
      <CreatePart
        buttonRef={editPartButtonRef}
        nameValue={partTitle}
        setNameValue={setPartTitle}
        descriptionValue={partDescription}
        setDescriptionValue={setPartDescription}
        handlePartFileChange={handlePartFileChange}
        isSaving={isSaving}
        onClickFunc={updateCoursePart}
      />

      {/* Edit course dialog */}
      <CreateCourseDialog
        buttonRef={editCourseDetailsButtonRef}
        courseTitle={courseTitle}
        setCourseTitle={setCourseTitle}
        courseDescription={courseDescription}
        setCourseDescription={setCourseDescription}
        coursePrice={coursePrice}
        setCoursePrice={setCoursePrice}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        isEditable={true}
        submitFunc={updateCourse}
        isSaving={isSaving}
        categories={categories}
      />

      {/* delete course confirmation dialog */}
      <ConfirmationDialog
        alertTriggerButtonRef={deleteCourseButtonRef}
        title="Are you sure ?"
        description=""
        confirmFunc={() => deleteCourse()}
      />

      {/* delete section confirmation dialog */}
      <ConfirmationDialog
        alertTriggerButtonRef={deleteSecConfirmDialogRef}
        title="Are you sure ?"
        description=""
        confirmFunc={() => deleteCourseSection()}
      />

      {/* delete part confirmation dialog */}
      <ConfirmationDialog
        alertTriggerButtonRef={deletePartConfirmDialogRef}
        title="Are you sure ?"
        description=""
        confirmFunc={() => deleteCoursePart()}
      />
    </>
  );
};

export default EditCourse;
