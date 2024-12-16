import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

const UserSignUp = () => {

    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        };
        try {
            const response = await api("/users", "POST", user);
            if (response.status === 201) {
                console.log(`Successfully signed up and authenticated.`);
                await actions.signIn(user);
                navigate("/");

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
        <div className="form--centered">
            <h2>Sign Up</h2>
            <ErrorsDisplay errors={errors} />
            <form>
                <label htmlFor="firstName">First Name</label>
                <input 
                id="firstName" 
                name="firstName" 
                type="text" 
                ref={firstName} 
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                id="lastName" 
                name="lastName" 
                type="text" 
                ref={lastName}
                />
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                id="emailAddress" 
                name="emailAddress" 
                type="email" 
                ref={emailAddress}
                />
                <label htmlFor="password">Password</label>
                <input 
                id="password" 
                name="password" 
                type="password" 
                ref={password} 
                />
                <button className="button" onClick={handleSubmit}>
                    Sign Up
                </button>
                <button className="button button-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!
            </p>
        </div>
    );

}







export default UserSignUp;