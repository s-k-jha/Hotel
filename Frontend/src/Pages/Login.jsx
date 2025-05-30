import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../style/Login.css';
// const Image = require('../assets/hotel-img.jpg'); // Adjust the path as necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [signup, setSignup] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/person/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log('Login response:', data);

                // Store the token in localStorage or sessionStorage
                localStorage.setItem('token', token);
                toast.success('Login successful!');

                navigate('/home');
                // window.location.href = 'https://hotel-server-abx9.onrender.com/menu';

            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-wrapper">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="login-image">
                {/* Replace with your actual image path */}
                {/* <img src="/hotel-img.jpg" alt="Left Image" />
                 */}
                <video
                    src="/login-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* video used for education purpose only not for commercial use 
                source-> zomato */}
            </div>

            {signup && (
                <div className="signup-message">
                    <h2>Signup Successful!</h2>
                    <p>You can now login with your credentials.</p>
                </div>
            )}
                
            <div className="login-container">
                <h1 className='slogan'>Jaha Bhuk! Waha Hum!</h1>
                <h2>Just 60 Seconds Away!</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p className='register-link'>
                        <a style={{color:'black'}}> Don't have an account? </a><a href="/register" onClick={()=>setSignup(true)}> Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
