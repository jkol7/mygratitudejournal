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


router.post('/save', (req, res) => {

            console.log('Body:', req.body)
            res.json({msg: 'We received your data'})
        })






export { router }