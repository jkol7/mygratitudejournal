import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {router} from './routes/api.js';
import {userRouter} from './routes/userRoutes.js';
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config({path: '../.env'});

const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Created to pass body from form

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie middleware

app.use(cookieParser());

// Created for Heroku production

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

const PORT = process.env.PORT || 5000;

//HTTP request logger

app.use('/api', router);
app.use('/api/users', userRouter);

app.use('./public/', express.static('uploads'));

//MongoDB and PORT connection

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});
