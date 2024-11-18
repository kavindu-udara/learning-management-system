import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-color lg:h-[300px] py-10 flex justify-center">
      <div className="container grid lg:grid-cols-3 gap-10 text-[32px] pb-10 border-b border-dark-acent-color lg:ml-0 ml-5">
        <div className="grid grid-cols-1">
          <div className="text-primary-color font-jua">About Us</div>
          <div className="text-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
            asperiores laudantium blanditiis sequi. Porro natus voluptas officia
            aliquam ducimus, expedita harum debitis animi asperiores
            voluptatibus labore modi nihil qui omnis!
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="text-primary-color font-jua">Additional Links</div>
          <div className="text-[15px]">
            <ul>
              <li>Login</li>
              <li>Register</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Become Instructor</li>
              <li>Terms and Rules</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="text-primary-color font-jua">Information Links</div>
          <div className="text-[15px]">
            <ul>
              <li>Login</li>
              <li>Register</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Become Instructor</li>
              <li>Terms and Rules</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
