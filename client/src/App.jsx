import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import Error from "./components/Error";


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />


        {/* Error Handling */}
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<Error />} />
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </div>
  );
};

export default App;
