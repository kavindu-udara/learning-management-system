import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/axios/axios";
import { toast } from "react-toastify";
import { addUser } from "@/features/user/userSlice";
import Header from "@/components/Header";

const Profile: React.FC = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.userReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFname(user?.fname);
      setLname(user?.lname);
      setEmail(user?.email);
    }
  }, []);

  const validate = () => {
    if (fname && lname && email) {
      return true;
    }
    return false;
  };

  const update = async () => {
    if (validate()) {
      setIsLoading(true);
      apiClient
        .put(
          `/user/${user?._id}`,
          {
            fname,
            lname,
            email,
          }
        )
        .then((res) => {
          dispatch(addUser(res.data.user));
          toast.success(res.data.message);
        })
        .catch((err) => toast.error(err.response.data.message));
      setIsLoading(false);
    }
  };

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update();
  };

  return (
    <>
    <Header/>
    <div className="flex bg-slate-200 h-screen justify-center items-center content-center">
      <form onSubmit={(e) => formSubmit(e)}>
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="fname">First Name</label>
                <Input
                  type="text"
                  id="fname"
                  name="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="lname">Last Name</label>
                <Input
                  type="text"
                  id="lname"
                  name="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="lname">Email</label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
    </>
  );
};

export default Profile;
