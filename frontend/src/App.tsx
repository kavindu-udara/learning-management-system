import "./App.css";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
const Register = lazy(() => import("./pages/auth/Register"));
import "react-toastify/dist/ReactToastify.css";
const Login = lazy(() => import("./pages/auth/Login"));
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/user/Profile"));
const SingleCoursePage = lazy(() => import("./pages/course/SingleCoursePage"));
const TeacherCoursesPage = lazy(() => import("./pages/teacher/TeacherCoursesPage"));
const CreateCourse = lazy(() => import("./pages/teacher/CreateCourse"));
const EditCourse = lazy(() => import("./pages/course/EditCourse"));
const EntrollCoursePage = lazy(
  () => import("./pages/course/EntrollCoursePage")
);
import TeacherRoute from "./routes/TeacherRoute";
import Index from "./pages/LandingPage";
import LoadingPage from "./pages/LoadingPage";
import CartPage from "./pages/CartPage";
import TeacherLayout from "./layouts/TeacherLayout";
import NewTeacherDashboard from "./pages/teacher/NewTeacherDashboard";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
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
}

export default App;
