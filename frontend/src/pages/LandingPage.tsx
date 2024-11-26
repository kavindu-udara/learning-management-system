import Footer from "@/components/Footer";
import React from "react";
import sec01Img from "../assets/indexPage/index-section-img01.png";
import sec02Img from "../assets/indexPage/index-section-img02.png";
import sec03Img from "../assets/indexPage/index-section-img03.png";
import GetStartedButton from "@/components/buttons/GetStartedButton";
import CountCard from "@/components/cards/CountCard";
import LearnMoreButton from "@/components/buttons/LearnMoreButton";
import TestimonialCard from "@/components/cards/TestimonialCard";
import BlogCard from "@/components/cards/BlogCard";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="container">
          <div className="lg:grid lg:grid-cols-5 hidden mb-10 mt-5">
            <div className="text-center text-[36px] text-dark-acent-color font-jua">
              Blog
            </div>
            <div className="text-center text-[36px] text-dark-acent-color font-jua">
              Blog
            </div>
            <div className="text-center text-[48px] text-primary-color font-jua">
              Purrfect
            </div>
            <div className="text-center text-[36px] text-dark-acent-color font-jua">
              Blog
            </div>
            <div className="text-center text-[36px] text-dark-acent-color font-jua">
              Blog
            </div>
          </div>
          <section className="flex lg:flex-row flex-col-reverse ">
            <div className="grid grid-cols-1 basis-1/2">
              <div className="text-[96px] font-jua lg:text-left text-center">
                <span className="font-jua text-primary-color">Finally,</span> a
                Better Education For Your Child
              </div>
              <div className="flex lg:justify-start justify-center">
                <GetStartedButton
                  onClickCallback={() => {
                    navigate("/home");
                  }}
                />
              </div>
            </div>
            <div className="basis-1/2 flex justify-center">
              <img src={sec01Img} alt="" />
            </div>
          </section>
          <section className="grid xl:grid-cols-4 grid-cols-2 gap-5 py-10">
            <CountCard title="Happy Students" count={10} />
            <CountCard title="Happy Students" count={10} />
            <CountCard title="Happy Students" count={10} />
            <CountCard title="Happy Students" count={10} />
          </section>
          <section className="grid lg:grid-cols-2 grid-cols-1 my-10">
            <div className="flex justify-center">
              <img src={sec02Img} alt="" className="max-w-[450px]" />
            </div>
            <div className="grid grid-cols-1">
              <div className="text-[64px] font-jua text-primary-color text-center">
                Become an Instructor
              </div>
              <div className="font-montserrat text-[24px] text-light-gray-color text-center">
                Are you interested to be a part of our community? You can be a
                part of our community by signing up as an instructor or
                organization.
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:max-h-[103px]">
                <GetStartedButton onClickCallback={() => {}} />
                <LearnMoreButton />
              </div>
            </div>
          </section>
          <section className="flex lg:flex-row flex-col-reverse my-10 ">
            <div className="basis-1/2 grid grid-cols-1">
              <div className="text-[64px] font-jua text-primary-color text-center">
                Become an Instructor
              </div>
              <div className="font-montserrat text-[24px] text-light-gray-color text-center">
                Are you interested to be a part of our community? You can be a
                part of our community by signing up as an instructor or
                organization.
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:max-h-[103px]">
                <GetStartedButton onClickCallback={() => {}} />
                <LearnMoreButton />
              </div>
            </div>
            <div className="basis-1/2 flex justify-center">
              <img src={sec03Img} alt="" className="max-w-[450px]" />
            </div>
          </section>
          <section className="bg-secondary-color my-10 p-5 rounded-[21px] lg:h-[800px] h-[400px]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0ql20JKrscQ"
              title="Open Source Motion Capture for Autonomous Drones"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </section>
          <section className="my-10">
            <div className="w-full text-center text-[64px] text-primary-color font-jua">
              What our customers say about us
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-10">
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
            </div>
          </section>
          <section className="my-10">
            <div className="w-full lg:text-left text-[64px] text-primary-color font-jua text-center">
              Blog
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-10">
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
