import tw from 'tailwind-styled-components';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [work, setWork] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const payload = {
        name,
        age,
        email,
        mobile,
        address,
        work,
        username,
        password
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/person/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Signup response:', data);
                toast.success('Signup successful!');
                setTimeout(() => {
                     navigate('/'); // Redirect to login page after successful signup
                },1000); 

               
            } else {
                const errorData = await response.json();
                console.error('Signup error:', errorData);
                toast.success('Signup failed. Please try again.');
            }
        }
    catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <Container>
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
            <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
            <form className="bg-white p-8 rounded shadow-md w-126" onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>

                    <div>
                        <div className="mb-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                type="text"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <Label htmlFor="mobile">Phone</Label>
                            <Input
                                type="text"
                                id="mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="work">Work</Label>
                            <Select
                                id="work"
                                value={work}
                                onChange={(e) => setWork(e.target.value)}
                            >
                                <option value="">Select work</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="manager">Manager</option>
                                <option value="warden">Warden</option>
                                <option value="BDE">BDE</option>
                                <option value="HR">HR</option>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <Button type="submit">Sign Up</Button>
                <a href ="/" className="text-blue-500 hover:underline mt-4 block text-center">
                    Already have an account? Login here
                </a>
            </form>
        </Container>
    );
}

const Container = tw.div`flex flex-col items-center justify-center h-screen bg-gray-100`;
const Label = tw.label`block text-sm font-medium mb-2`;
const Input = tw.input`w-full px-3 py-2 border rounded`;
const Button = tw.button`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600`;
const Select = tw.select`w-full px-3 py-2 border rounded bg-white`;

export default Signup;