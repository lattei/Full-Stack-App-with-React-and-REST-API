import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

const CourseDetail = () => {

  // Authenticated User, course ID from url, go between routes
  const { authUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Set state for course data
  const [course, setCourse] = useState(null);

  /*Retrieve the data of the course from the /api/courses/:id API endpoint.
Render the course data to the page. Use the React Markdown package to render the description and materialsNeeded properties as Markdown.
The "Update Course" link should navigate the user to the /courses/:id/update route
The Delete button doesn't need any functionality yet, you can implement this after the authentication has been setup. */

  useEffect(() => {
    getCourse();

  }, [id, navigate]);

  const getCourse = async () => {
    try {
      const res = await api(`/courses/${id}`, "GET");
      console.log(res.data)
      setCourse(res.data);
    } catch (error) {
      navigate("/error");
    }
        
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button"
            to={`/courses/${id}/update`}>
            Update Course
          </Link>
          <button className="button" href="#">
            Delete Course
          </button>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          {/* Replace with something more static
            Such as title = course.title
            within paragraph tags, keep course.description */}
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              {/* if course has user, user.firstname, user.lastname, no then ??? */}
              <p>
                By{" "}
                {course.User
                  ? `${course.User.firstName} ${course.User.lastName}`
                  : `????`}
              </p>
              {/* Rendering course data to the page */}
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;