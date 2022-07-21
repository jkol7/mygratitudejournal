import express from "express"
import { PostGratitude } from '../models/postGratitude.js'


const router = express.Router()



router.get('/', (req, res) => {

    PostGratitude.find({})
        .then((data) => {
            console.log('Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log(`This is your error: ${error}`)
        })

})



export { router }