import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
import SingleCourseHeroSection from "@/components/course/SingleCourseHeroSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

  const { id } = useParams();

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
        onClickFunc={() => {}}
      />

      <div className="flex justify-center mb-10">
        <div className="container mt-5">
          <CourseTabs />

          <div>
            <div className="text-3xl font-bold my-5">Description</div>
            <div className="text-gray-500 text-lg my-5">
              {course?.description}
            </div>
          </div>

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
