import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileIcon from "../assets/header/default-profile-icon.png";

const Header: React.FC = () => {
  // const user = useSelector((state: RootState) => state.userReducer.user);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : [];

  const navigate = useNavigate();

  return (
    <header className="bg-secondary-color w-full flex justify-center">
      <nav className="container flex items-center justify-between py-3 lg:px-8">
        <div className="flex lg:flex-1">
          <span className="font-jua text-primary-color text-2xl">Purrfect</span>
        </div>
        <div>
          <img
            src={defaultProfileIcon}
            alt="profile-icon"
            onClick={() => {
              !user?._id ? navigate("/login") : navigate("/profile");
            }}
            className="w-[40px] cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
