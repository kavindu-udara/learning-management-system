import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import defaultProfilePic from "../../assets/header/default-profile-icon.png";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { validatePassword } from "@/lib/regex";

const Profile: React.FC = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newpassword, setNewpassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [profileImage, setProfileImage] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const changePasswordButtonRef = useRef<HTMLButtonElement>(null);

  const user = useSelector((state: any) => state.userReducer.user);

  const [profileImageUrl, setProfileImageUrl] = useState<any>(user?.imageUrl);

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
            userId: user?._id,
            fname,
            lname,
            email,
            profileImage,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(file);
        const imageUrl = URL.createObjectURL(file);
        setProfileImageUrl(imageUrl); // Update state with the new image URL
      }
    }
  };

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update();
  };

  const handleChangePassword = () => {
    if (
      password !== "" &&
      newpassword !== "" &&
      newPasswordConfirmation !== ""
    ) {
      if (
        validatePassword(newpassword) &&
        validatePassword(newPasswordConfirmation)
      ) {
        if (newpassword === newPasswordConfirmation) {
          apiClient
            .put(`/user/${user?._id}/change-password`, {
              oldPassword: password,
              newPassword: newpassword,
            })
            .then((res) => {
              toast.success(res.data.message);
              setPassword("");
              setNewpassword("");
              setNewPasswordConfirmation("");
              changePasswordButtonRef.current?.click();
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
        } else {
          toast.error("New Password and Confirm New Password should be same");
        }
      } else {
        toast.error(
          "Password should be atleast 8 characters long and should contain atleast one uppercase, one lowercase, one number and one special character"
        );
      }
    } else {
      toast.error("All Fields are required");
    }
  };

  return (
    <>
      <Header />
      <Dialog>
        <DialogTrigger className="hidden" ref={changePasswordButtonRef}>
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 w-full items-center gap-4 mb-4">
            <div className="grid w-full items-center gap-4">
              <Label>Old Password</Label>
              <Input
                type="password"
                id="old-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-4">
              <Label>New Password</Label>
              <Input
                type="password"
                id="new-password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-4">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                id="new-password-confirmation"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleChangePassword}>Change</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex bg-white h-screen justify-center items-center content-center">
        <form onSubmit={(e) => formSubmit(e)}>
          <Card className="lg:w-[500px] w-full">
            <CardHeader>
              <CardTitle className="font-montserrat text-dark-acent-color text-center">
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-center">
                    <Input
                      ref={imageInputRef}
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                    />
                    <span
                      className="bg-secondary-color rounded-full cursor-pointer border-2 border-primary-color"
                      onClick={() => imageInputRef?.current?.click()}
                    >
                      <img
                        src={profileImageUrl || defaultProfilePic}
                        alt="profile-pic"
                        className="w-[120px] h-[120px] rounded-full"
                      />
                    </span>
                  </div>
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
                <div className="flex flex-col space-y-1.5">
                  <Button
                    type="button"
                    className="w-full bg-dark-acent-color"
                    onClick={() => changePasswordButtonRef?.current?.click()}
                  >
                    Change Password
                  </Button>
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
