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
    const data = req.body;
    
    const newGratitude = new PostGratitude(data)

    newGratitude.save((error) => {
        if (error){
            res.status(500).json({ msg: 'Sorry, internal server error' })
            return
        } 
           return res.json({
                msg: 'Your data has been saved!'
            })
        })
        })






export { router }