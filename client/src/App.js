import React from "react"
import Nav from "./components/Nav"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import Register from './components/Register.js'
import MainLandingPage from './components/MainLandingPage'

export default function App(){


    return (
        <>
        <Router>
                <Nav/>  
                <Routes>
                    <Route path='/' element={<MainLandingPage/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
        </Router>    
        </>
    )

}




