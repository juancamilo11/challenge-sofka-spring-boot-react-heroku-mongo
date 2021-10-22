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
                    <h2 className="text-center m-2">Sign up for free</h2><br/> 
                    <p className="text-center">By creating a new account you will be able to ask and answer</p>
                </div>
            </div>
            <div className="form-control">
                <div className="form-container">
                    <div className="login-form">
                        <form onSubmit={registerUser}>
                            <div className="form-group">
                                <label className="text-center form-label" >User Name</label>
                                <input 
                                    type="text" 
                                    id="login"
                                    name="email"
                                    className="form-input" 
                                    placeholder="User email"
                                    onChange={handleInputChange}
                                    value={userData.email} />
                            </div>
                            <div class="form-group">
                                <label className="text-center form-label">Password</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="Password" 
                                    onChange={handleInputChange}
                                    value={userData.password} />
                            </div>
                            <button type="submit" className="btn btn-light btn-ingresar mb-3">Sign up</button>   
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login;
