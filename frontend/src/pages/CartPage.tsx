import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { useSelector } from "react-redux";

const CartPage: React.FC = () => {
  const user = useSelector((state: any) => state.userReducer.user);

  return (
    <>
      <Header />
      <div className="w-full flex justify-center">
        <div className="container my-10">
          <div className="container">
            <div className="text-3xl text-dark-acent-color font-jua">
              My Cart
            </div>
            <div>
                
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
