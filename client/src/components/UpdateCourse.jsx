import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

/* In the <UpdateCourse /> component, fetch the details of the course being updated by sending a GET request to the REST API's /api/courses/:id endpoint
Populate the form fields with the existing course data
When the form is being submitted, send a PUT request to the REST API's /api/courses/:id endpoint with the updated course title, description, estimated time, and materials needed
After successfully updating the course, redirect the user back to the "Course Detail" screen to see their update */

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState(null);

    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    /* Create fn like in course detail where i get course with endpoint
    user has to be user who made the course in order to update
    redirect to course detail after update */

    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await api(`/courses/${id}`, 'GET');
                const data = await res.json();
                if (res.status === 200) {
                    if (data.userId !== authUser.id) {
                        navigate("/forbidden");
                    } else {
                        setCourse(data);
                    }
                } else if (res.status === 404) {
                    navigate("/notfound");
                } else {
                    throw new Error();
                }
            } catch (error) {
                navigate("/error");
            }
        }
        getCourse();
    }, [authUser, id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const courseData = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }

        const res = await api(`/courses/${id}`, "PUT", courseData, authUser)

        try {
            if (res.status === 204) {
                console.log("Updated!")
                navigate(`/courses/${id}`);

            } else if (res.status === 400) {
                const data = await res.json();
                setErrors(data.errors);
            } else if (res.status === 404) {
                navigate("/notfound");
            } else if (res.status === 403) {
                navigate("/forbidden")
            } else if (res.status === 500) {
                navigate("/error")
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                            id="courseTitle" name="courseTitle" 
                            type="text" 
                            ref={courseTitle}
                            defaultValue={course?.title}
                            />

                                <p>By {authUser.firstName} {authUser.lastName}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription"
                                ref={courseDescription}
                                defaultValue={course?.description}>
                                </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" 
                            ref={estimatedTime} 
                            defaultValue={course?.estimatedTime} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded"
                                ref={materialsNeeded}
                                defaultValue={course?.materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}

export default UpdateCourse;