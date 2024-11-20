import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import VideoPlayer from "@/components/video/VideoPlayer";

const EntrollCoursePage: React.FC = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState([]);
  const [sections, setSections] = useState([]);
  const [courseParts, setCourseParts] = useState([]);
  const [currentPartId, setCurrentPardId] = useState<string>("");
  const [currentSectionId, setCurrentSectionId] = useState<string>("");

  const [videoUrl, setVideoUrl] = useState<string>("");

  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const getNextCoursePartId = (currentId: string) => {
    if (courseParts.length > 0 && currentId !== "" && currentSectionId !== "") {
      const filteredParts = courseParts.filter(
        (part) => part.sectionId === currentSectionId
      );
      const currentIndex = filteredParts.findIndex(
        (part) => part._id === currentId
      );
      if (currentIndex !== -1 && currentIndex < filteredParts.length - 1) {
        return filteredParts[currentIndex + 1]._id;
      }
    }

    return "";
  };

  const finished = () => {
    toast.success("Finished");
    if (currentPartId !== "" && courseParts.length > 0) {
      const currentIndex = courseParts.findIndex(
        (part) => part._id === currentPartId
      );
      setCurrentSectionId(courseParts[currentIndex].sectionId);
      const nextPartId = getNextCoursePartId(currentPartId);
      nextPartId !== "" && getVideo(nextPartId);
    }
  };

  const loadCourseData = () => {
    apiClient
      .get(`/course/entroll/${courseId}`)
      .then((res) => {
        if (!res.data.isPurchased) {
          toast.error("You have to purchase first !");
        }
        console.log(res);
        setCourse(res.data.course);
        setSections(res.data.courseSections);
        // setCourseParts(res.data.courseParts);
        setCourseParts(res.data.watchHistoryParts);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const getVideo = async (partId: string) => {
    setCurrentPardId(partId.toString());
    setVideoUrl(
      `http://localhost:8000/api/v1/video/${partId}?ts=${Date.now()}`
    );
    videoPlayerRef.current?.load();
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
      <div className="w-full my-5">
        <div className="flex justify-center my-5">
          <div className="container font-jua text-dark-acent-color text-2xl">
            {course?.title}
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <div className="container grid grid-cols-3 gap-3">
            <div
              className="col-span-2"
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
                parts={courseParts}
                isEditable={false}
                partTitleCallback={getVideo}
              />
            </div>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EntrollCoursePage;
