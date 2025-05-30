import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from "./Components/Home";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {

  return (

    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>

    </>
  );
}

export default App;