import express from 'express'
const userRouter = express.Router()
import { registerUser, loginUser, getMe } from '../controllers/userController.js'


userRouter.post('/', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/me', getMe)


export {userRouter}