import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
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
      <div className="bg-[#EFF4FF] flex justify-center">
        <div className="container flex flex-row py-10 gap-10">
          <div className="basis-1/2">
            <Badge variant="outline" className="bg-white">
              {category}
            </Badge>
            <div className="text-3xl font-bold text-[#2563EB] my-3">
              {course?.title}
            </div>
            <p className="text-gray-500">{course?.description}</p>
            <div className="flex flex-wrap text-lg mt-3">
              <div className="text-gray-500 mr-5 inline-flex items-center gap-1">
                <FaUsers />
                145,000 students
              </div>
              <div className="text-gray-500 mr-5 inline-flex items-center gap-1">
                <IoMdTime />6 Hr
              </div>
              <div className="text-gray-500 mr-5 inline-flex items-center gap-1">
                <FaCalendarAlt />
                Last updated 2 days ago
              </div>
            </div>
            <Button className="mt-5">Entroll Now</Button>
          </div>
          <div className="basis-1/2">
            <img src="https://picsum.photos/500/300" alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container mt-5">
          <div className="border-b flex flex-wrap gap-5 text-lg pb-3">
            <div className="font-bold text-[#2563EB]">About</div>
            <div>Course content</div>
            <div>What includes</div>
            <div>Ratings</div>
          </div>

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
    </>
  );
};

export default SingleCoursePage;
