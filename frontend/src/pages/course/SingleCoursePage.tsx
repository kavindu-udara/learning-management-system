import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
import PurchaseCourse from "@/components/course/PurchaseCourse";
import SingleCourseHeroSection from "@/components/course/SingleCourseHeroSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type course =
  | {
      _id: string;
      title: string;
      description: string;
      categoryId: string;
    }
  | [];

type sections =
  | [
      {
        _id: string;
        title: string;
        courseId: string;
        createdAt: string;
        updatedAt: string;
      }
    ]
  | [];

type parts =
  | [
      {
        _id: string;
        title: string;
        description: string;
        videoUrl: string;
        sectionId: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
    ]
  | [];

const SingleCoursePage: React.FC = () => {
  const [course, setCourse] = useState<course>([]);
  const [category, setCategory] = useState<string>("");
  const [sections, setSections] = useState<sections>([]);
  const [parts, setParts] = useState<parts>([]);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const payDialogRef = React.useRef<HTMLButtonElement>(null);

  const { id } = useParams();

  // TODO : check use is logged if not payment will be show a error

  const navigate = useNavigate();

  const categories = useSelector(
    (state: RootState) => state.courseCategoriesReducer.categories
  );

  const loadCourseData = () => {
    apiClient
      .get(`/course/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        setSections(res.data.courseSections);
        setParts(res.data.courseParts);
        setIsPurchased(res.data.isPurchased);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getCourseCategory = () => {
    const category = categories.find((cat) => cat._id === course.categoryId);
    setCategory(category ? category.name : "");
  };

  const handleStartCourse = () => {
    if (!isPurchased) {
      toast.error("You have to buy this course first !");
      payDialogRef.current?.click();
    } else {
      navigate(`/course/entroll/${course?._id}`);
    }
  };

  useEffect(() => {
    loadCourseData();
    getCourseCategory();
  }, []);

  return (
    <>
      <Header />

      {!isPurchased && (
        <PurchaseCourse
          triggerRef={payDialogRef}
          courseId={id}
          coursePrice={course?.price}
          courseTitle={course?.title}
          loadCourseData={loadCourseData}
        />
      )}

      <SingleCourseHeroSection
        category={category}
        title={course?.title}
        description={course?.description}
        onClickFunc={() => handleStartCourse()}
        price={course?.price}
        imageUrl={course?.imageUrl}
      />
      <div className="flex justify-center mb-10">
        <div className="container mt-5">
          <CourseTabs />
          <div>
            <CourseContentSectionsAccordion
              sections={sections}
              parts={parts}
              isEditable={false}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleCoursePage;
