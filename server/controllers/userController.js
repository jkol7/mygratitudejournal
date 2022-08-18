import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'



// Generate tokens

const generateAccessToken = (founderUserName, foundUserId) => {
    return jwt.sign(
        { "username": founderUserName,
        "user": foundUserId },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    })
}


const generateRefreshToken = (founderUserName, foundUserId) => {
    return jwt.sign({ "username": founderUserName,
    "user": foundUserId}, 
    process.env.REFRESH_TOKEN_SECRET, {
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

    // Assign username to pass to create token 

    let founderUserName = foundUser.username

    let foundUserId = foundUser.id

    if (foundUser && (await bcrypt.compare(password, foundUser.password))){

          // Saving refreshToken with current user

          const refToken = generateRefreshToken(founderUserName, foundUserId)
          foundUser.refToken = refToken;
          await foundUser.save();

        // Creates Secure Cookie with refresh token

        // Removed secure: true during dev

        res.cookie('jwt', refToken, { httpOnly: true, /*secure: true*,*/ sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });


        res.json({

            _id: foundUser.id,
            username: founderUserName,
            email: foundUser.email,
            accessToken: generateAccessToken(founderUserName, foundUserId)

        })

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})




// @desc    Logout
// @route   GET /api/users/logout
// @access  Private



const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    
    const refToken = cookies.jwt;

    console.log("Here is what refresh token finds:   " + await User.findOne({ refToken }).exec())

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}





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
    getMe,
    handleLogout
}