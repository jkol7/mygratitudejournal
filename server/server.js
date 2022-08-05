
import express from "express"
import cors from "cors"
import mongoose from 'mongoose'
import dotenv from "dotenv"
import { router } from './routes/api.js'

const app = express()

app.use(cors())

dotenv.config()


// Created to pass body from form

app.use(express.json())
app.use(express.urlencoded({ extended: true }))




const PORT = process.env.PORT || 5000;

const CONNECTION_URL = process.env.CONNECTION_URL


//HTTP request logger

app.use('/api', router)

app.use('./public/', express.static('uploads'))

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

  
//MongoDB and PORT connection

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error.message) )

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

