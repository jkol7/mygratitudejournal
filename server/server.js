
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import dotenv from "dotenv"
import { router } from './routes/api.js'

const app = express()

//Cors is commented out because we are currently using a proxy to run with concurrently 
//app.use(cors())

dotenv.config()


// Created to pass body from form

app.use(express.json())
app.use(express.urlencoded({ extended: false }))




const PORT = process.env.PORT || 5000;

const CONNECTION_URL = process.env.CONNECTION_URL


//HTTP request logger

app.use('/api', router)

app.use('./public/uploads', express.static('uploads'))


//MongoDB and PORT connection

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error.message) )

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

