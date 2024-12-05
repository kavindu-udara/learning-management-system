import apiClient from "@/axios/axios";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface categoryType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const CreateCourse: React.FC = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [courseImage, setCourseImage] = useState<any>(null);

  const categories = useSelector(
    (state: any) => state.courseCategoriesReducer.categories
  );

  const createCourse = () => {
    setIsLoading(true);
    if (validateFields()) {
      apiClient
        .post(`/course/create`, {
          title,
          description,
          price,
          categoryId,
          courseImage
        }, {headers: {"Content-Type": "multipart/form-data"}})
        .then((res) => {
          toast.success(res.data.message);
          navigate(`/teacher/edit-course/${res.data.course._id}`);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }else{
      toast.error("All fields are required!");
    }
    setIsLoading(false);
  };

  const validateFields = (): boolean => {
    if (title && description && price && categoryId !== undefined) {
      return true;
    }
    return false;
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCourse();
  };

  return (
    <>
      <Header />
      <div className=" flex flex-col justify-center items-center">
        <form onSubmit={(e) => formSubmit(e)} >
          <Card className="w-[700px]">
            <CardHeader>
              <CardTitle className="text-dark-acent-color">Create Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 w-full items-center gap-4 mb-4">
                <div className="grid w-full items-center gap-4">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-4">
                  <Label>Category</Label>
                  <Select
                    value={categoryId}
                    onValueChange={(categoryId: string) =>
                      setCategoryId(categoryId)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category: categoryType) => {
                          return (
                            <SelectItem value={category._id}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Price (USD)</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Course Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCourseImage(e.target.files![0])}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "creating" : "Create"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default CreateCourse;
