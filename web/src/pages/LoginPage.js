import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { login } from "../actions/authActions";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


firebase.initializeApp({
    apiKey: "AIzaSyD1FAJa3tEqtFHa2oBtr_hn3mEymVW5-aY",
    authDomain: "chat-app-sofka.firebaseapp.com",
    projectId: "chat-app-sofka",
    storageBucket: "chat-app-sofka.appspot.com",
    messagingSenderId: "125870203988",
    appId: "1:125870203988:web:c22b550089554beae439c1",
    measurementId: "G-5YS3R0Z7YC"
  });


const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(()=>{
            Swal.fire('Bienvenido')
        })
        .catch(()=>{
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: 'Usuario o contraseña invalida'
            })
        })
};

const auth = firebase.auth();


export const LoginPage = ({dispatch}) => {

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

    const loginUser = (event) => {
        event.preventDefault()
        return auth.signInWithEmailAndPassword(userData.email, userData.password)
            .then(()=>{
                Swal.fire('Bienvenido')
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    text: 'Usuario o contraseña invalida'
                })
            })
    }

    const [user] = useAuthState(auth);
    if (user) {
        dispatch(login(user.email, user.uid));
    }

    return (
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2 className="text-center m-2">Login Page</h2><br/>
                    <p className="text-center">Login or register from here to access.</p>
                </div>
            </div>
            <div className="form-control">
                <div className="form-container">
                    <div className="login-form">
                        <form onSubmit={loginUser}>
                            <div className="form-group">
                                <label className="text-center form-label" htmlFor="login">User Name</label>
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
                                <label className="text-center form-label" htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="Password" 
                                    onChange={handleInputChange}
                                    value={userData.password} />
                            </div>
                            <button type="submit" className="btn btn-light btn-ingresar">Login</button>
                            <p className="text-center mt-3 form-label">or</p>   
                            <button 
                                type="button" 
                                className="btn btn-light btn-ingresar btn-google"
                                onClick={signInWithGoogle}>Login with Google account</button>
                        </form>
                        <div><p className="mt-4 form-text">New to this website? <Link to="/register">Click here to Sign up!</Link></p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login;
