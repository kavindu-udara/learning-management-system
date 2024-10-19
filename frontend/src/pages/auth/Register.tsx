import React, { useState } from "react";
import apiClient from "../../axios/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register: React.FC = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validate = () => {
    if (fname && lname && email && password && passwordConfirmation) {
      return true;
    }
    return false;
  };

  const register = async () => {
    if (validate()) {
      if (password === passwordConfirmation) {
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
            navigate("/");

            console.log(res);
          })
          .catch((err) => toast.error(err.response.data.message));
        setIsLoading(false);
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("All fields are required");
    }
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="flex h-screen bg-slate-200 items-center content-center justify-center">
      <form onSubmit={(e) => formSubmit(e)}>
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Enter an email and password</CardDescription>
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
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading" : "Register"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Register;