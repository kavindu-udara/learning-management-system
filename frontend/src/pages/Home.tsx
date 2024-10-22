import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import LargeCourseCard from "@/components/course/LargeCourseCard";
import LargeGetCard from "@/components/cards/LargeGetCard";
import apiClient from "@/axios/axios";
import { toast } from "react-toastify";
import { addUser } from "@/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { addCourseCategories } from "@/features/course/courseCategoriesSlice";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const loadCourseCategories = async () => {
    apiClient
      .get(`/course/categories`)
      .then((res) => {
        dispatch(addCourseCategories(res.data.categories));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadCourses = () => {
    apiClient
      .get(`/course`)
      .then((res) => {
        console.log(res.data.courses);
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateToTeacher = async () => {
    apiClient
      .get(`/user/${user?._id}/update-to-teacher`)
      .then((res) => {
        dispatch(addUser(res.data.user));
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoTeacherDashboard = () => {
    navigate("/teacher");
  };

  useEffect(() => {
    loadCourseCategories();
    loadCourses();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-5 pb-10">
        {user?.role === "user" && (
          <LargeGetCard
            title="Become a Teacher"
            description="We all start somewhere. For programming, this series is that first"
            buttonText="make me a teacher"
            buttonAction={updateToTeacher}
          />
        )}

        {user?.role === "teacher" && (
          <LargeGetCard
            title="Get Started"
            description="We all start somewhere. For programming, this series is that first"
            buttonText="Dashboard"
            buttonAction={gotoTeacherDashboard}
          />
        )}

        <div className="text-xl font-bold text-[#2563EB] text-left container">Discover</div>

        {courses.map((course: any) => {
          return (
            <LargeCourseCard
              id={course?._id}
              title={course?.title}
              description={course?.description}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Home;
