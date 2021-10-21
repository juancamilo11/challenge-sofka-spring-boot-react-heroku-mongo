import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { login } from "../actions/authActions";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

export const RegisterPage = ({dispatch}) => {

    const [userData, setuserData] = useState({
        email:'',
        password:''
    })

    const handleInputChange = (event) => {
        setuserData({
            ...userData,
            [event.target.name] : event.target.value
        })
    }

    const registerUser = (event) => {
        event.preventDefault()
        return auth.createUserWithEmailAndPassword(userData.email, userData.password);
    }

    const [user] = useAuthState(auth);
    if (user) {
        dispatch(login(user.email, user.uid));
    }

    return (
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Application<br/> Login Page</h2>
                    <p>Login or register from here to access.</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form onSubmit={registerUser}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input 
                                    type="text" 
                                    id="login"
                                    name="email"
                                    className="form-control" 
                                    placeholder="User email"
                                    onChange={handleInputChange}
                                    value={userData.email} />
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password" 
                                    onChange={handleInputChange}
                                    value={userData.password} />
                            </div>
                            <button type="submit" className="btn-login btn-email">Login</button>   
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login;
