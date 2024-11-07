import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPlayer from 'react-player'

const EntrollCoursePage: React.FC = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState([]);
  const [sections, setSections] = useState([]);
  const [courseParts, setCourseParts] = useState([]);

  const [videoUrl, setVideoUrl] = useState<string>("");

  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const loadCourseData = () => {
    apiClient
      .get(`/course/${courseId}`)
      .then((res) => {
        if(!res.data.isPurchased) {
            toast.error("You have to purchase first !");
        }
        setCourse(res.data.course);
        setSections(res.data.courseSections);
        setCourseParts(res.data.courseParts);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getVideo = async (partId: number) => {
    setVideoUrl(
      `http://localhost:8000/api/v1/video/${partId}?ts=${Date.now()}`
    );
    videoPlayerRef.current?.load();
    console.log(videoUrl);
  };

  useEffect(() => {
    loadCourseData();
    if (courseParts.length > 0) {
      setVideoUrl(
        `http://localhost:8000/api/v1/video/${
          courseParts[0]._id
        }?ts=${Date.now()}`
      );
      videoPlayerRef.current?.load();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="w-full">
        <ReactPlayer url={videoUrl}/>
        <div className="flex justify-center mb-10">
          <div className="container mt-5">
            <video
              ref={videoPlayerRef}
              controls
              className="container min-h-[800px] max-h-[800px] bg-black"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
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
                parts={courseParts}
                isEditable={false}
                partTitleCallback={getVideo}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EntrollCoursePage;
