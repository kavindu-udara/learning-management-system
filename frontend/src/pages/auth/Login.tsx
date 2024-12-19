import React, { useState } from "react";
import apiClient from "../../axios/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { validateEmail, validatePassword } from "@/lib/regex";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email");
      return false;
    } else if (!validatePassword(password)) {
      toast.error("Invalid Password");
      return false;
    } else {
      return true;
    }
  };

  const login = async () => {
    if (validate()) {
      setIsLoading(true);
      apiClient
        .post("/auth/signin", {
          email,
          password,
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

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex h-screen bg-slate-100 items-center content-center justify-center">
      <form onSubmit={(e) => formSubmit(e)}>
        <Card className="lg:w-[500px] w-full">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your email and password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1">
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
            <Link
              to={"/register"}
              className="text-center mt-3 font-montserrat text-light-gray-color"
            >
              don't have an account ?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
