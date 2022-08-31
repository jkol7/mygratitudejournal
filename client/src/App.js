import React from "react"
import Nav from "./components/Nav"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import Register from './components/Register.js'
import MainLandingPage from '../src/pages/MainLandingPage'


export default function App(){


    return (
        <>
        <Router>
                <Nav/>  
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/landing' element={<MainLandingPage/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
        </Router>    
        </>
    )

}




