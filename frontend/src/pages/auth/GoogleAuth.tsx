import apiClient from "@/axios/axios";
import GoogleSignButton from "@/components/buttons/GoogleSignButton";
import { addUser } from "@/features/user/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  setIsLoading: (value: boolean) => void;
}

const GoogleAuth: React.FC<Props> = ({ setIsLoading }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignin = (data: any) => {
    if (data) {
      const fname = data.name.split(" ")[0];
      const lname = data.name.split(" ")[1];
      const email = data.email;

      setIsLoading(true);
      apiClient
        .post("/auth/google", {
          email,
          fname,
          lname,
        })
        .then((res) => {
          setIsLoading(false);
          dispatch(addUser(res.data.user));
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return <GoogleSignButton successCallback={handleGoogleSignin} />;
};

export default GoogleAuth;
