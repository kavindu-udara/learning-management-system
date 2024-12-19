import React, { useState } from "react";
import apiClient from "../../axios/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail, validateName, validatePassword } from "@/lib/regex";

const Register: React.FC = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!validateName(fname)) {
      toast.error("Invalid first name");
      return false;
    } else if (!validateName(lname)) {
      toast.error("Invalid last name");
      return false;
    } else if (!validateEmail(email)) {
      toast.error("Invalid email");
      return false;
    } else if (
      !validatePassword(password) ||
      !validatePassword(passwordConfirmation)
    ) {
      toast.error("Invalid password");
      return false;
    } else if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return false;
    } else {
      return true;
    }
  };

  const register = async () => {
    toast.error("Passwords do not match");
    if (validate()) {
      setIsLoading(true);
      apiClient
        .post("/auth/signup", {
          fname,
          lname,
          email,
          password,
        })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/home");
        })
        .catch((err) => toast.error(err.response.data.message));
      setIsLoading(false);
    }
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="flex h-screen bg-slate-200 items-center content-center justify-center">
      <form onSubmit={(e) => formSubmit(e)}>
        <Card className="lg:w-[500px] w-full">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="fname">First name</label>
                <Input
                  type="text"
                  name="fname"
                  id="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="lname">Last name</label>
                <Input
                  type="text"
                  name="lname"
                  id="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password_confirmation">Confirm password</label>
                <Input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading" : "Register"}
            </Button>
            <Link
              to={"/login"}
              className="text-center mt-3 font-montserrat text-light-gray-color"
            >
              Already have an account ?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Register;