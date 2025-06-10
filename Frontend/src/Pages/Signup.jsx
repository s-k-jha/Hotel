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
    const [disabled, setDisabled] = useState(false);

    const payload = { name, age, email, mobile, address, work, username, password };

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
                toast.success('Signup successful!');
                setDisabled(true);

                setTimeout(() => navigate('/'), 1000);
                setTimeout(() => setDisabled(false), 400);
            } else {
                const errorData = await response.json();
                console.error('Signup error:', errorData);
                toast.error('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <Container>
            <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">Sign Up</h1>

            <form
                className="bg-white p-6 sm:p-8 rounded shadow-md w-full sm:w-[90%] md:w-[700px] lg:w-[800px] xl:w-[900px]"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <Field label="Name" value={name} onChange={setName} id="name" type="text" />
                        <Field label="Age" value={age} onChange={setAge} id="age" type="text" />
                        <Field label="Email" value={email} onChange={setEmail} id="email" type="email" />
                        <Field label="Username" value={username} onChange={setUsername} id="username" type="text" />
                    </div>

                    <div className="flex-1">
                        <Field label="Phone" value={mobile} onChange={setMobile} id="mobile" type="text" />
                        <Field label="Address" value={address} onChange={setAddress} id="address" type="text" />
                        
                        <div className="mb-4">
                            <Label htmlFor="work">Work</Label>
                            <Select id="work" value={work} onChange={(e) => setWork(e.target.value)}>
                                <option value="">Select work</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="manager">Manager</option>
                                <option value="warden">Warden</option>
                                <option value="BDE">BDE</option>
                                <option value="HR">HR</option>
                            </Select>
                        </div>

                        <Field label="Password" value={password} onChange={setPassword} id="password" type="password" />
                    </div>
                </div>

                <Button type="submit" disabled={disabled}>
                    {disabled ? 'Loading...' : 'Sign Up'}
                </Button>

                <div className="text-center mt-4">
                    <a href="/" className="text-blue-500 hover:underline">
                        Already have an account? Login here
                    </a>
                </div>
            </form>
        </Container>
    );
}

// Reusable Field Component
const Field = ({ label, id, value, onChange, type }) => (
    <div className="mb-4">
        <Label htmlFor={id}>{label}</Label>
        <Input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

// Styled components
const Container = tw.div`flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4`;
const Label = tw.label`block text-sm font-medium mb-2`;
const Input = tw.input`w-full px-3 py-2 border rounded`;
const Button = tw.button`w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50`;
const Select = tw.select`w-full px-3 py-2 border rounded bg-white`;

export default Signup;
