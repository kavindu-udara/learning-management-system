import apiClient from "@/axios/axios";
import CourseContentSectionsAccordion from "@/components/course/CourseContentSectionsAccordion";
import CourseTabs from "@/components/course/CourseTabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import VideoPlayer from "@/components/video/VideoPlayer";

const EntrollCoursePage: React.FC = () => {
  const { courseId } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState([]);
  const [sections, setSections] = useState([]);
  const [courseParts, setCourseParts] = useState([]);
  const [currentPartId, setCurrentPardId] = useState<string>("");
  const [currentSectionId, setCurrentSectionId] = useState<string>("");
  const [partDescription, setPartDescription] = useState<string>("");

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
        setCourse(res.data.course);
        setSections(res.data.courseSections);
        setCourseParts(res.data.watchHistoryParts);
      })
      .catch((err) => {
        if (
          err.response.data.message == "Token not found" ||
          err.response.data.message == "Wrong token"
        ) {
          toast.error("Please login First");
          navigate("/login");
        }
      });
  };

  const getVideo = async (part: any) => {
    setPartDescription(part.description);
    setCurrentPardId(part._id.toString());
    setVideoUrl(
      `http://localhost:8000/api/v1/video/${part._id}?ts=${Date.now()}`
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
    if (courseParts.length > 0) {
      if (!courseParts[0].isLocked) {
        // setVideoUrl(
        //   `http://localhost:8000/api/v1/video/${
        //     courseParts[0]._id
        //   }?ts=${Date.now()}`
        // );
        // videoPlayerRef.current?.load();
      } else {
        unlockVideo(courseParts[0]._id);
      }
    }
  }, [courseParts]);

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
                partTitleUnlockCallback={unlockVideo}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <div className="container mt-5">
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
