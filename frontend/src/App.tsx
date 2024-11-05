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
import EntrollCoursePage from "./pages/course/EntrollCoursePage";
import BuildCheckout from "./pages/stripe/BuildCheckout";
import PaymentComplete from "./pages/stripe/PaymentComplete";
import PrivateRoute from "./routes/PrivateRoute";
import CompletePage from "./pages/stripe/CompletePage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/course">
          <Route path=":id" element={<SingleCoursePage />} />
          <Route path="entroll/:id" element={<EntrollCoursePage />} />
        </Route>

        <Route path="/teacher">
          <Route index element={<TeacherDashboard />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
        </Route>

        {/* <Route path="/checkout/*" element={<PrivateRoute />}/> */}
        {/* Add the new route for Stripe Checkout */}
        <Route element={<PrivateRoute />}>
          <Route path="/checkout/:courseId/*" element={<BuildCheckout />} />
        </Route>
        {/* <Route path="/payment-complete" element={<PaymentComplete />} /> */}
        {/* <Route path="/payment-complete" element={<CompletePage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
