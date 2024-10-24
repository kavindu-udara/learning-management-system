import apiClient from "@/axios/axios";
import LargeGetCard from "@/components/cards/LargeGetCard";
import OverviewCard from "@/components/cards/OverviewCard";
import MediumCourseCard from "@/components/course/MediumCourseCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TeacherDashboard: React.FC = () => {
  const [myCourses, setMycourses] = useState([]);

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.userReducer.user);
  const categories = useSelector(
    (state: RootState) => state.courseCategoriesReducer.categories
  );

  const goToCreateNewCourse = () => {
    navigate("/teacher/create-course");
  };

  const loadTecherCourses = () => {
    apiClient
      .get(`/course/teacher/${user._id}`)
      .then((res) => {
        setMycourses(res.data.courses);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    loadTecherCourses();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-5 my-10">
        <div className="container">
          <div className="font-bold text-3xl text-[#2563EB]">
            Hi, {user?.fname} !
          </div>
          <p className="text-gray-600">Let's get Started</p>
        </div>
        <LargeGetCard
          title="Create a new course"
          description="Become a teacher and start teaching"
          buttonText="Create"
          buttonAction={() => goToCreateNewCourse()}
        />
        <div className="container flex flex-wrap gap-5">
          <OverviewCard title="Total Courses" count={myCourses.length} />
        </div>
        <div className="container grid grid-cols-2 font-semibold">
          <div className="text-xl font-bold text-[#2563EB]">My Courses</div>
          <div className="underline text-[#2563EB] text-end">View all</div>
        </div>
        <div className="container grid grid-cols-2 gap-5">
          {myCourses.map((myCourse) => {
            const category = categories.find(
              (cat) => cat._id === myCourse.categoryId
            );

            // If the category is found, use its name, otherwise default to ''
            const categoryName = category ? category.name : "";

            return (
              <MediumCourseCard
                categoryText={categoryName}
                titleText={myCourse.title}
                priceText={myCourse.price}
                courseId={myCourse._id}
                isEditable={true}
              />
            );
          })}
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default TeacherDashboard;
