import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import {User} from '../models/userModel.js'

// @desc    Register user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler (async (req, res) => {
    const {name, email, password} = req.body
    
    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    res.json({message: 'Register User'})
})


// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler (async (req, res) => {
    res.json({message: 'Login User'})
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Public

const getMe = asyncHandler (async (req, res) => {
    res.json({message: 'User data display'})
})



export  {

    registerUser,
    loginUser,
    getMe
}