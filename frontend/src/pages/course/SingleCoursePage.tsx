import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
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

  const { id } = useParams();

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
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getCourseCategory = () => {
    const category = categories.find((cat) => cat._id === course.categoryId);
    setCategory(category ? category.name : "");
  };

  useEffect(() => {
    loadCourseData();
    getCourseCategory();
  }, []);

  return (
    <>
      <Header />

      <SingleCourseHeroSection
        category={category}
        title={course?.title}
        description={course?.description}
        onClickFunc={() => {
          if (!isPurchased) {
            toast.error("You have to buy this course first !");
          } else {
            navigate(`/course/entroll/${course?._id}`);
          }
        }}
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
