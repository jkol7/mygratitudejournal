
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import dotenv from "dotenv"
import postRoutes from "./routes/posts.js"

const app = express()


app.use('/posts', postRoutes)

app.use(bodyParser.json( {limit: "30mb", extended: true}))

app.use(bodyParser.urlencoded( {limit: "30mb", extended: true}))

app.use(cors())

const PORT = process.env.PORT || 5000;

dotenv.config()
const CONNECTION_URL = process.env.CONNECTION_URL


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error.message) )

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})