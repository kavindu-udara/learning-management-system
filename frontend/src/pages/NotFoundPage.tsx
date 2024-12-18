import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage:React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="text-center flex flex-col gap-3">
        <div className="text-3xl font-bahnschrift text-primary-color">404 - Not Found</div>
        <div>Sorry, this pages doesn't exist</div>
        <div>
          <Button onClick={() => navigate('/home')}>Go to Home Page</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
