import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import VideoPlayer from "@/components/video/VideoPlayer";

type Course = {
  title: string;
};

type Part = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  sectionId: string;
  isLocked: boolean;
};

type Sections = {
  _id: string;
  title: string;
  courseId: string;
  parts: Part[];
}[];

const EntrollCoursePage: React.FC = () => {
  const { courseId } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState<Course>({ title: "" });
  const [sections, setSections] = useState<Sections>([]);
  const [partDescription, setPartDescription] = useState<string>("");

  const [videoUrl, setVideoUrl] = useState<string>("");

  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const finished = () => {
    toast.success("Finished");
  };

  const loadCourseData = () => {
    apiClient
      .get(`/course/entroll/${courseId}`)
      .then((res) => {
        if (!res.data.course.isPurchased) {
          toast.error("You have to purchase first !");
        }
        setCourse(res.data.course);
        setSections(res.data.course.sections);
      })
      .catch((err) => {
        if (
          err.response.data.message == "Token not found" ||
          err.response.data.message == "Wrong token"
        ) {
          toast.error("Please login First");
          navigate("/login");
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  const getVideo = async (part: any) => {
    setPartDescription(part.description);
    setVideoUrl(
      `${import.meta.env.VITE_API_BASE_URL}/video/${part._id}?ts=${Date.now()}`
    );
    videoPlayerRef.current?.load();
  };

  const unlockVideo = async (partId: number) => {
    apiClient
      .get(`/video/unlock/${partId}`)
      .then((res) => {
        toast.success(res.data.message);
        loadCourseData();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    loadCourseData();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full my-5 lg:mx-0 ">
        <div className="lg:flex lg:justify-center my-5">
          <div className="lg:container font-jua text-dark-acent-color text-2xl">
            {course?.title}
          </div>
        </div>
        <div className="lg:flex lg:justify-center lg:mb-10">
          <div className="lg:container grid lg:grid-cols-3 gap-3 lg:mx-0 mx-5">
            <div
              className="lg:col-span-2 "
              onContextMenu={(e) => e.preventDefault()}
            >
              <VideoPlayer
                url={videoUrl}
                title=""
                finishedCallback={finished}
              />
            </div>
            <div>
              <CourseContentSectionsAccordion
                sections={sections}
                isEditable={false}
                partTitleCallback={getVideo}
                partTitleUnlockCallback={unlockVideo}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <div className="w-full lg:container mt-5 lg:mx-0 mx-5">
            <CourseTabs />
            <div>
              <div className="text-3xl font-bold font-montserrat text-dark-acent-color my-5">
                Description
              </div>
              <div className="text-gray-500 text-lg my-5">
                {partDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EntrollCoursePage;
