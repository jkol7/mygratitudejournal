import express from "express"
import { PostGratitude } from '../models/postGratitude.js'
import multer from "multer"
import { protect } from '../middleware/authMiddleware.js'
import { User } from '../models/userModel.js'

const router = express.Router()



//define storage for images


const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, '../client/public');
    },
    
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname.split(" ").join("-").toLowerCase());
    },
  });

  
  const maxSize = 5 * 1024 * 1024;

  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize }
    });

  


router.get('/', protect, async (req, res) => {

   await PostGratitude.find({ user: req.user.id })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
          console.log(err)
        })

})



router.get('/:id', protect, (req, res) => {

  PostGratitude.findById(req.params.id)
      .then((data) => {
          return res.json(data)
      })
      .catch((err) => {
        console.log(err)
      })

})




router.post('/save', protect, upload.single('imageUrl'), (req, res) => {

  let newImageUrl

  if (typeof req.file === "undefined") {
    newImageUrl = "sunset.jpg";
  } else {
    newImageUrl = req.file.filename;
  }

    const newGratitude = new PostGratitude({

        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        imageUrl: newImageUrl,
        user: req.user.id


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


 router.put('/edit', protect, upload.single('imageUrl'), async (req, res) => {

  let newImageUrl
  const id = req.body._id

 if (typeof req.file === "undefined") {
    newImageUrl = req.body.imageUrl
  } else {
    newImageUrl = req.file.filename;
  }

  const user = await User.findById(req.user.id)
  
  // Check for user

  if (!user){
    res.status(401)
    throw new Error ('User not found')
  }

  // Checks logged in user matches goal user

  if (PostGratitude.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
  }


  try {
    await PostGratitude.findByIdAndUpdate(id, 
      {title: req.body.title,
       category: req.body.category,
       description: req.body.description,
       imageUrl: newImageUrl}
       )
  }

  catch (error){
    console.log(error)
  }

  return res.json({
    msg: 'Your data has been saved!'
})

})
    

router.delete('/:id', protect, async (req, res) => {

  const gratitude = await PostGratitude.findById(req.params.id)
  const user = await User.findById(req.user.id)


  console.log(gratitude)
    
  // Check for user

  if (!user){
    res.status(401)
    throw new Error ('User not found')
  }

  // Checks logged in user matches goal user

  if (gratitude.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
  }
  

    await PostGratitude.findByIdAndDelete(req.params.id)
      
    res.status(200).json("Gratitude deleted")
})


export { router }