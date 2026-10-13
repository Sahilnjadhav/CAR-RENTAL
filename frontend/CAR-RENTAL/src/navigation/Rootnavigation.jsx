import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Profile from '../pages/Profile'

function Rootnavigation() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/register" element={<Register/>} />
                

                <Route path="/login" element={<Login/>} />

                
                <Route path="/" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
                    
                

            </Routes>

            <Footer/>
            


        </>
    )
}

export default Rootnavigation