import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './login.css'

const Register = (props) => {
    const navigate = useNavigate()
    const turn =() =>{
        navigate('/')
    }
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})
    // handle onChange for registre inputs
    const handleRegisterChange = (e) => {
        e.preventDefault();
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }
    // Handle register form onSumbit 
    const registerHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", register)
            .then(res => {
                console.log(res.data);
                setRegister({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/signIn")
                })
            
            .catch(err =>{
                const errorResponse = err.response.data; // Get the errors from err.response.data
                const obj={}
                for (const key in errorResponse){
                    obj[key]=errorResponse[key].message
                }
                console.log(obj);
                setErrors(obj)
    })


    }

    return (
        <div className="auth-form-container">
            <div className="box">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="logo" />

        <div>
        <h1>Register</h1>
        <form className="register-form" onSubmit={registerHandler}>
            
            <label htmlFor="fname">First Name: </label>
            <input value={register.firstName} name="firstName" onChange={handleRegisterChange} type="text"id="fname" placeholder="must be at least 2 charachters"/>
            {errors.firstName}
            <label htmlFor="lname"> Last Name: </label>
            <input value={register.lastName} name="lastName" onChange={handleRegisterChange} type="text" placeholder="must be at least 2 charachters"/>
            {errors.lastName}         
            <label htmlFor="email">Email: </label>
            <input value={register.email} name="email" onChange={handleRegisterChange} type="email" placeholder={errors.email?errors.email:'email@gmail.com'} id="email"/>
            {errors.email}
            <label htmlFor="password">Password: </label>
            <input value={register.password}  name="password" onChange={handleRegisterChange} type="password" placeholder={errors.password? errors.password:"********" }  id="password"/>
            {errors.password}
            <label htmlFor="cpassword">Confirm your Password: </label>
            <input value={register.confirmPassword} name="confirmPassword" onChange={handleRegisterChange} type="password" placeholder="********" id="cpassword"/> <br />
            {errors.confirmPassword} 
            <div> <br />

            <button type="submit">Log In</button>
            {errors.register ? Object.entries(errors.register).map(([key, value], index) => value ? <p style={{ color: "red" }} key={index}>{value.message}</p> : null) : null}

            </div>
        </form>
        <button className="link-btn" onClick={turn}>Already have an account? Login here.</button>

        </div>
            </div>
    </div>
    )
}

export default Register