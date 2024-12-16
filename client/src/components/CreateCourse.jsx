import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";


const CreateCourse = () => {

    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Setting up state similar to how I've set up signup
    
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            userId: authUser.id,
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        };

        /* In the handleSubmit function, send a POST request to the REST API's /api/courses endpoint with the user id, course title, description, estimated time, and materials needed in the body of the request */

        try {
            const response = await api("/courses", "POST", course, authUser);

            /* After successfully creating the new course, redirect the user to the "Courses" or "Course Detail" screen for the newly created course. */
            if (response.status === 201) {
                console.log(`Course has been created.`);
                const courseId = response.data;
                navigate(`/courses/${courseId}`);

            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    }





    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                {/* change this to error component */}
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input 
                        id="courseTitle" 
                        name="courseTitle" 
                        type="text" 
                        ref={title}
                        />

                            {/* <p>By {authUser.firstName} {authUser.lastName}</p> */}

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                            id="courseDescription" 
                            name="courseDescription"
                            ref={description}
                            >

                            </textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" 
                        type="text" 
                        ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"
                            ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateCourse;