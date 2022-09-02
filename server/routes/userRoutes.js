import express from 'express';
const userRouter = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
  handleLogout,
} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';
import {handleRefreshToken} from '../controllers/refreshTokenController.js';

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/me', protect, getMe);

userRouter.get('/logout', handleLogout);

userRouter.get('/refresh', handleRefreshToken);

export {userRouter};
