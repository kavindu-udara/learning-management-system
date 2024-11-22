import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
import PurchaseCourse from "@/components/course/PurchaseCourse";
import SingleCourseHeroSection from "@/components/course/SingleCourseHeroSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  const [sections, setSections] = useState<sections>([]);
  const [parts, setParts] = useState<parts>([]);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const payDialogRef = React.useRef<HTMLButtonElement>(null);

  const { id } = useParams();

  const user = useSelector((state:any) => state.userReducer.user);

  const navigate = useNavigate();

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

  const handleStartCourse = () => {
    if (user?._id) {
      if (!isPurchased) {
        toast.error("You have to buy this course first !");
        payDialogRef.current?.click();
      } else {
        navigate(`/course/entroll/${course?._id}`);
      }
    } else {
      toast.error("Please Login First");
      navigate("/login");
    }
  };

  useEffect(() => {
    loadCourseData();
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
        category={course?.categoryName}
        title={course?.title}
        description={course?.description}
        onClickFunc={() => handleStartCourse()}
        price={course?.price}
        imageUrl={course?.imageUrl}
        teacherName={course?.teacher?.fname + " "+course?.teacher?.lname}
        teacherImage={course?.teacher?.imageUrl}
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
