import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";


const CreateCourse = () => {

    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Setting up state similar to how I've set up signup
    
    // const firstName = useRef(null);
    // const lastName = useRef(null);
    // const emailAddress = useRef(null);
    // const password = useRef(null);
    // const [errors, setErrors] = useState([]);

        

    //     const user = {
    //         firstName: firstName.current.value,
    //         lastName: lastName.current.value,
    //         emailAddress: emailAddress.current.value,
    //         password: password.current.value
    //     };

    /* course props:
        title
        description
        estimated time
        materialsneeded
        */




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api("/users", "POST", user);
            if (response.status === 201) {
                console.log(`Successfully signed up and authenticated.`);
                await actions.signIn(user.emailAddress, user.password);
                navigate("/courses");

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
                        ref={course.title}
                        />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                            id="courseDescription" 
                            name="courseDescription"
                            value
                            >

                            </textarea>
                    </div>
                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="">

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
        </div>
    );
};

export default CreateCourse;