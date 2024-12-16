import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils/apiHelper";


const Courses = () => {
    const navigate = useNavigate();

  //State for courses
    const  [courses, setCourses] = useState([]);

    useEffect(() => {
      const getCourses = async () => {
        try {
          const res = await api("/courses", "GET");
          if (res.status === 500) {
            navigate("/error")
          }
          const data = await res.json();
          setCourses(data);
        } catch (error) {
          console.log(`Something went wrong, ${error}`);
          navigate("/error");
        }
      }
      getCourses();
    }, [navigate]);


    return (
      // Main goals: Get list of courses from REST API's ENDPOINT /api/courses
      // Render list of courses, linking to specific course detail page
      // Render a link to create course a course - take us to create course page
      <main>
        <div className="wrap main--grid">
          {/* Iterate through Courses using the map fn
            with Link tag having the className, to url path and key being course.id
            inherit h2 className course-label Course
            inherit h3 className course--title course.title
             */}
          {courses.map((course) => (
            <Link
              className="course--module course--link"
              key={course.id}
              to={`/courses/${course.id}`}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          ))}
          {/* Create a Link tag with className course--module course--add-module TO the path api to create courses ?? /courses/create 
          Wrap it around below */}
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <span className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </span>
          </Link>
        </div>
      </main>
    );
};

export default Courses;