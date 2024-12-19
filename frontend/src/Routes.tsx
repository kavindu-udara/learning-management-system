import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import TeacherRoute from "./routes/TeacherRoute";
import TeacherLayout from "./layouts/TeacherLayout";

import LoadingPage from "./pages/LoadingPage";
import { ToastContainer } from "react-toastify";

const Home = React.lazy(() => import("./pages/Home"));
const Index = React.lazy(() => import("./pages/LandingPage"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Profile = React.lazy(() => import("./pages/user/Profile"));
const SingleCoursePage = React.lazy(
  () => import("./pages/course/SingleCoursePage")
);
const EntrollCoursePage = React.lazy(
  () => import("./pages/course/EntrollCoursePage")
);
const CartPage = React.lazy(() => import("./pages/CartPage"));
const NewTeacherDashboard = React.lazy(
  () => import("./pages/teacher/NewTeacherDashboard")
);
const TeacherCoursesPage = React.lazy(
  () => import("./pages/teacher/TeacherCoursesPage")
);
const CreateCourse = React.lazy(() => import("./pages/teacher/CreateCourse"));
const EditCourse = React.lazy(() => import("./pages/course/EditCourse"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/course">
            <Route path=":id" element={<SingleCoursePage />} />
            <Route path="entroll/:courseId" element={<EntrollCoursePage />} />
          </Route>

          <Route path="/cart" element={<CartPage />} />

          <Route element={<TeacherRoute />}>
            <Route path="/teacher">
              <Route element={<TeacherLayout />}>
                <Route index element={<NewTeacherDashboard />} />
                <Route path="courses" element={<TeacherCoursesPage />} />
                <Route path="create-course" element={<CreateCourse />} />
                <Route path="edit-course/:id" element={<EditCourse />} />
              </Route>
            </Route>
          </Route>

          {/* Add this Route at the end */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;