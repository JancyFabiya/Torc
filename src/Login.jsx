import React from 'react'
import './Login.css'
import { useState } from 'react'
import logo from './image/logo.png'
import { BsArrowRight } from "react-icons/bs"
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRememberMe = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault()


        //---- Email Validation---
        const emailEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailEx.test(email)) {
            setErrorMessage('Invalid email format')
            return
        }

        //---- Password Validation -----

        if (password.length < 10 || password.length > 16) {
            setErrorMessage('Password must be 10-16 characters long');
            return;
        }
        if (password.includes(' ')) {
            setErrorMessage('Password must not contain any whitespaces');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setErrorMessage('Password must contain at least one uppercase character');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setErrorMessage('Password must contain at least one lowercase character');
            return;
        }
        if (!/\d/.test(password)) {
            setErrorMessage('Password must contain at least one digit');
            return;
        }
        if (!/[^a-zA-Z0-9\s]/.test(password)) {
            setErrorMessage('Password must have at least one special symbol');
            return;
        }
        setErrorMessage('')
        setSuccessMessage('Login successful');
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <img className="logo" src={logo} alt='' />

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmail} placeholder='Enter your email' required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div className="password-input-wrapper">
                        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={handlePassword} placeholder='Enter your password' required />
                        <div className="password-toggle" onClick={handleShowPassword}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" checked={rememberMe} onChange={handleRememberMe} hidden />
                        <span className="checkmark"></span>
                        Remember Me
                    </label>
                </div>
                <button type="submit">Login <BsArrowRight className='arrow' /></button>

            </form>
        </div>
    )
}

export default Login