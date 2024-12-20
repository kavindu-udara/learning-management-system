import apiClient from "@/axios/axios";
import CourseCartCard from "@/components/cards/CourseCartCard";
import CartPayDialog from "@/components/cart/CartPayDialog";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CartItem {
  course: {
    categoryName: string;
    title: string;
    price: string;
    _id: string;
    imageUrl: string;
  };
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const payDialogRef = useRef<HTMLButtonElement>(null);

  const user = useSelector((state: any) => state.userReducer.user);

  const navigate = useNavigate();

  const loadCartData = () => {
    apiClient
      .post(`/cart`)
      .then((res) => {
        setCart(res.data.cart);
        setTotal(res.data.total);
      })
      .catch(() => {
        console.log("Some thing went wrong. Please try again.");
      });
  };

  const handleRemoveFromCart = (courseId: string) => {
    apiClient
      .delete(`/cart/${courseId}`)
      .then((res) => {
        toast.success(res.data.message);
        loadCartData();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    !user?._id && navigate("/login");
    loadCartData();
  }, []);

  return (
    <>
      <Header />

      {}

      {cart && (
        <CartPayDialog
          triggerRef={payDialogRef}
          successCallback={loadCartData}
        />
      )}
      <div className="w-full flex justify-center">
        <div className="container my-10">
          <div className="container">
            <div className="text-3xl text-dark-acent-color font-jua">
              My Cart
            </div>
            {cart.length > 0 ? (
            <div className="grid gap-3 grid-cols-2 my-5">
              {cart.map((item) => {
                return (
                  <CourseCartCard
                    categoryText={item?.course?.categoryName}
                    titleText={item?.course?.title}
                    priceText={item?.course?.price}
                    courseId={item?.course?._id}
                    imageUrl={item?.course?.imageUrl}
                    removeFromCartCallback={handleRemoveFromCart}
                  />
                );
              })}
            </div>
            ):(
              <div className="w-full justify-center h-[400px] flex items-center ">
                Your Cart is Empty
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-secondary-color py-5 w-full flex justify-center">
        <div className="container flex justify-end gap-10 items-center border-b border-primary-color py-5">
          <div className="text-2xl text-primary-color font-jua">Total</div>
          <div className="text-dark-acent-color font-jua text-2xl">
            ${total}
          </div>
          <Button onClick={() => cart.length > 0 ?  payDialogRef.current?.click() : toast.error('cart is empty')}>
            Checkout
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
