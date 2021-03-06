import express from "express"
import { PostGratitude } from '../models/postGratitude.js'
import multer from "multer"

const router = express.Router()



//define storage for images


const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, '../client/public');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });

  
  const maxSize = 5 * 1024 * 1024;

  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize }
    });

  


router.get('/', (req, res) => {

    PostGratitude.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log(`This is your error: ${error}`)
        })

})


router.post('/save', upload.single('imageUrl'), (req, res) => {

    console.log(req.file)

    const newGratitude = new PostGratitude({

        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        imageUrl: req.file.filename

    })

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