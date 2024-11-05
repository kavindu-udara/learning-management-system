import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { useParams } from "react-router-dom";

const EntrollCoursePage: React.FC = () => {

  const {id} = useParams();

  return (
    <>
      <Header />
      <div>course entroll page {id}</div>
      <Footer />
    </>
  );
};

export default EntrollCoursePage;
