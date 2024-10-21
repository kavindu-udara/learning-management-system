import apiClient from "@/axios/axios";
import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaPlus } from "react-icons/fa6";
import CreateSection from "@/components/course/CreateSection";
import CreatePart from "@/components/course/CreatePart";
import SingleCourseHeroSection from "@/components/course/SingleCourseHeroSection";
import CreateCourseDialog from "@/components/course/CreateCourseDialog";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/alerts/ConfirmationDialog";

const EditCourse: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const [course, setCourse] = useState([]);
  const [courseSections, setCourseSections] = useState([]);
  const [courseParts, setCoursParts] = useState([]);

  const [category, setCategory] = useState<string>("");

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
    const file = e.target?.files[0];
    setPartFile(file);
  };

  const handleCourseEditButton = () => {
    editCourseDetailsButtonRef.current?.click();
  };

  const loadCourseCategories = async () => {
    apiClient
      .get(`/course/categories`)
      .then((res) => {
        setCategories(res.data.categories);
        categories.find((category) => {
          if (category._id === course.categoryId) {
            setCurrentCategory(category.name);
          }
        });
      })
      .catch((err) => {
        //
      });
  };

  const loadCourseData = () => {
    apiClient
      .get(`/course/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        setCourseSections(res.data.courseSections);
        setCoursParts(res.data.courseParts);

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
      .then((res) => {
        loadCourseData();
        setIsSaving(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsSaving(false);
      });
  };

  const getCourseCategory = () => {
    const category = categories.find(
      (cat: { _id: string }) => cat._id === course.categoryId
    );
    setCategory(category ? category.name : "");
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
    getCourseCategory();
  }, []);

  return (
    <>
      <Header />

      <SingleCourseHeroSection
        category={currentCategory}
        title={course?.title}
        description={course?.description}
        onClickFunc={handleCourseEditButton}
        deleteBtnFunc={handleCourseDeleteButton}
        isEditable={true}
      />

      <div className="flex justify-center">
        <div className="container mt-5">
          <div className="border-b flex flex-wrap gap-5 text-lg pb-3">
            <div className="font-bold text-[#2563EB]">Course content</div>
            <div>What includes</div>
            <div>Ratings</div>
          </div>

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
            <Accordion type="single" collapsible className="w-full">
              {courseSections.map((section) => (
                <AccordionItem value={section._id} className="text-xl">
                  <AccordionTrigger className="text-xl">
                    <div className="flex flex-row items-center gap-5">
                      {section.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-lg flex flex-row gap-5">
                    <Button onClick={() => handleEditSectionButton(section)}>
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => handleDeletesectionButton(section._id)}
                    >
                      Delete
                    </Button>
                  </AccordionContent>
                  {courseParts
                    .filter(
                      (part: { sectionId: string }) =>
                        part.sectionId === section._id
                    )
                    .map((part) => (
                      <AccordionContent className="text-lg">
                        {part.title}
                        <Button
                          className="mx-5"
                          onClick={() => handleEditPartButton(part)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500"
                          onClick={() => handleDeletePartButton(part._id)}
                        >
                          Delete
                        </Button>
                      </AccordionContent>
                    ))}
                  <AccordionContent className="text-lg text-center flex justify-center">
                    <span
                      onClick={() => handleAddPartDialog(section._id)}
                      className="bg-[#EFF4FF] p-2 cursor-pointer text-[#2563EB]"
                    >
                      <FaPlus />
                    </span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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