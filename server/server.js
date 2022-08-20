
import express from "express"
import cors from "cors"
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import { S3Client } from "@aws-sdk/client-s3";



import { router } from './routes/api.js'
import { userRouter } from './routes/userRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url';


dotenv.config({ path: '../.env'})

const app = express()

app.use(cors())


const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Created to pass body from form

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Cookie middleware

app.use(cookieParser())


// Created for Heroku production

app.use(express.static(path.join(__dirname, "..", "client", "build")));




const PORT = process.env.PORT || 5000;



//HTTP request logger

app.use('/api', router)
app.use('/api/users', userRouter)

app.use('./public/', express.static('uploads'))


  
//MongoDB and PORT connection


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error.message) )

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

