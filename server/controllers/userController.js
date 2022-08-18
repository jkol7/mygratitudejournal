import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'
import mongoose from 'mongoose'



// Generate tokens

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    })
}


const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '3d',
    })
}

// @desc    Register user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler (async (req, res) => {
    const {username, email, password} = req.body
    
    if (!username || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists

    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists')

    }

    // Hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email      })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler (async (req, res) => {

    const {username, password} = req.body

    // Check for user 
    const foundUser = await User.findOne({ username })

    if (foundUser && (await bcrypt.compare(password, foundUser.password))){

          // Saving refreshToken with current user

          const refToken = generateRefreshToken(foundUser._id)
          foundUser.refToken = refToken;
          await foundUser.save();

        // Creates Secure Cookie with refresh token

        // Removed secure: true during dev

        res.cookie('jwt', refToken, { httpOnly: true, /*secure: true*,*/ sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });


        res.json({

            _id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            token: generateAccessToken(foundUser._id)

        })

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({message: 'Login User'})
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = asyncHandler (async (req, res) => {
    const {_id, username, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        username,
        email
    })

})


export  {

    registerUser,
    loginUser,
    getMe
}