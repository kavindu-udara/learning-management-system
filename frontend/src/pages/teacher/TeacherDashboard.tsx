import apiClient from "@/axios/axios";
import LargeGetCard from "@/components/cards/LargeGetCard";
import OverviewCard from "@/components/cards/OverviewCard";
import MediumCourseCard from "@/components/course/MediumCourseCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface MyCourse {
  categoryName: string;
  title: string;
  price: string;
  _id: string;
  imageUrl: string;
}

const TeacherDashboard: React.FC = () => {
  const [myCourses, setMycourses] = useState<MyCourse[]>([]);

  const navigate = useNavigate();

  const user = useSelector((state: any) => state.userReducer.user);

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
    <div className="flex flex-col justify-center items-center gap-5 my-10 lg:mx-0 mx-5">
      <div className="container">
        <div className="text-3xl text-dark-acent-color font-jua">
          Hi, {user?.fname} !
        </div>
        <p className="text-gray-600 font-montserrat">Let's get Started</p>
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
        <div className="text-xl font-bold text-dark-acent-color">
          My Courses
        </div>
        <div className="underline text-primary-color text-end ">View all</div>
      </div>
      <div className="container grid lg:grid-cols-2 gap-5">
        {myCourses.map((myCourse) => {
          return (
            <MediumCourseCard
              categoryText={myCourse.categoryName}
              titleText={myCourse.title}
              priceText={myCourse.price}
              courseId={myCourse._id}
              imageUrl={myCourse.imageUrl}
              isEditable={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeacherDashboard;
