import "./App.css";
import { ToastContainer } from "react-toastify";
import Register from "./pages/auth/Register";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import SingleCoursePage from "./pages/course/SingleCoursePage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateCourse from "./pages/teacher/CreateCourse";
import EditCourse from "./pages/course/EditCourse";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course/:id" element={<SingleCoursePage />} />

        <Route path="/teacher">
          <Route index element={<TeacherDashboard/>} />
          <Route path="create-course" element={<CreateCourse/>} />
          <Route path="edit-course/:id" element={<EditCourse/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
