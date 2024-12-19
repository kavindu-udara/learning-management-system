import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface Props {
  successCallback: (data: any) => void;
}

const GoogleSignButton: React.FC<Props> = ({ successCallback }: Props) => {
  const handleLogin = (response: CredentialResponse) => {
    const token = response.credential;
    if (token) {
      const decoded = jwtDecode(token);
      successCallback(decoded);
    } else {
      toast.error("Signin Failed");
    }
  };

  const handleError = () => {
    toast.error("Signin Failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleLogin} onError={handleError} />
    </div>
  );
};

export default GoogleSignButton;
