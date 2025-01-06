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

interface Category {
  name: string;
}

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [courseCategories, setCourseCategories] = useState<Category[]>([]);

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
            description="Be a teacher and earn money !"
            buttonText="make me a teacher"
            buttonAction={updateToTeacher}
          />
        )}

        <div className="font-jua container text-start text-primary-color text-[40px] my-5 lg:mx-0 mx-5">
          Newest Courses
        </div>
        {courses.length === 0 ? (
          <div> no courses available </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-5 container">
            {courses.map((course: any, index) => {
              return (
                <CourseCard
                  key={index}
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
                  showCart={user?.role === "user" && !course.isPurchased}
                />
              );
            })}
          </div>
        )}
        <div className="font-jua container text-start text-primary-color text-[40px] my-5">
          Trending Categories
        </div>
        <div className="grid lg:grid-cols-6 gap-5 container">
          {courseCategories.map((category, index) => (
            <CourseCategoryCard key={index} title={category?.name} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
