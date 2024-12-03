import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import LargeGetCard from "@/components/cards/LargeGetCard";
import apiClient from "@/axios/axios";
import { toast } from "react-toastify";
import { addUser } from "@/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { addCourseCategories } from "@/features/course/courseCategoriesSlice";
import Footer from "@/components/Footer";
import CourseCard from "@/components/cards/CourseCard";
import CourseCategoryCard from "@/components/course/CourseCategoryCard";

type Category = {
  name: string;
}[];

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [courseCategories, setCourseCategories] = useState<Category>([]);

  const loadCourseCategories = async () => {
    apiClient
      .get(`/course/categories`)
      .then((res) => {
        dispatch(addCourseCategories(res.data.categories));
        setCourseCategories(res.data.categories);
      })
      .catch(() => {
        toast.error("Category loading failed");
      });
  };

  const loadCourses = () => {
    apiClient
      .get(`/course`)
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch(() => {
        toast.error("Courses loading failed");
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

  const handleAddToCart = (courseId: string) => {
    apiClient
      .post(`/cart/add`, {
        courseId,
      })
      .then((res) => {
        toast.success(res.data.message);
        loadCourses();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleRemoveFromCart = (courseId: string) => {
    apiClient
      .delete(`/cart/${courseId}`)
      .then((res) => {
        toast.success(res.data.message);
        loadCourses();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    loadCourseCategories();
    loadCourses();
  }, []);

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center items-center gap-5 py-10 mx-5 lg:mx-0">
        {user?.role === "teacher" && (
          <LargeGetCard
            title="Get Started"
            description="We all start somewhere. For programming, this series is that first"
            buttonText="Dashboard"
            buttonAction={gotoTeacherDashboard}
          />
        )}
        {user?.role === "user" && (
          <LargeGetCard
            title="Become a Teacher"
            description="We all start somewhere. For programming, this series is that first"
            buttonText="make me a teacher"
            buttonAction={updateToTeacher}
          />
        )}

        <div className="font-jua container text-start text-primary-color text-[40px] my-5 lg:mx-0 mx-5">
          Newest Courses
        </div>
        <div className="grid lg:grid-cols-4 gap-5 container">
          {courses.map((course: any) => {
            return (
              <CourseCard
                id={course?._id}
                title={course?.title}
                price={course?.price}
                createdAt={course?.createdAt}
                imageUrl={course?.imageUrl}
                teacherName={
                  course?.teacher?.fname + " " + course?.teacher?.lname
                }
                teacherImage={course?.teacher?.imageUrl}
                addToCartCallBack={handleAddToCart}
                removeFromCartCallBack={handleRemoveFromCart}
                isNew
                isInCart={course?.inCart}
                showCart={user?.role === "user"}
              />
            );
          })}
        </div>

        <div className="font-jua container text-start text-primary-color text-[40px] my-5">
          Trending Courses
        </div>
        <div className="grid lg:grid-cols-4 gap-5 container">
          {Array(4)
            .fill(null)
            .map((_) => (
              <CourseCard
                id="1"
                title="Title"
                price="100"
                createdAt="2024-10-22T22:13:22.147Z"
                imageUrl="http://127.0.0.1:8000/api/v1/image/default.jpg"
                teacherImage=""
                teacherName=""
              />
            ))}
        </div>

        <div className="font-jua container text-start text-primary-color text-[40px] my-5">
          Trending Categories
        </div>
        <div className="grid lg:grid-cols-6 gap-5 container">
          {courseCategories.map((category) => (
            <CourseCategoryCard title={category?.name} />
          ))}
        </div>

        <div className="font-jua container text-start text-primary-color text-[40px] my-5">
          Best Selling Courses
        </div>
        <div className="grid lg:grid-cols-4 gap-5 container">
          {Array(4)
            .fill(null)
            .map((_) => (
              <CourseCard
                id="1"
                title="Title"
                price="100"
                createdAt="2024-10-22T22:13:22.147Z"
                imageUrl="http://127.0.0.1:8000/api/v1/image/default.jpg"
                teacherImage=""
                teacherName=""
              />
            ))}
        </div>

        <div className="font-jua container text-start text-primary-color text-[40px] my-5">
          Free Courses
        </div>
        <div className="grid lg:grid-cols-4 gap-5 container">
          {Array(4)
            .fill(null)
            .map((_) => (
              <CourseCard
                id="1"
                title="Title"
                price="100"
                createdAt="2024-10-22T22:13:22.147Z"
                imageUrl="http://127.0.0.1:8000/api/v1/image/default.jpg"
                teacherImage=""
                teacherName=""
              />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
