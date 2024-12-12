import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const CourseDetail = () => {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" 
            to={`/courses/${course.id}/update`}>
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
                    ? `${course.User.firstName} {course.User.lastName}`
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