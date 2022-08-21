import express from "express"
import dotenv from "dotenv"
import multer from "multer"
import crypto from 'crypto'
import { PostGratitude } from '../models/postGratitude.js'
import { protect } from '../middleware/authMiddleware.js'
import { User } from '../models/userModel.js'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";



const router = express.Router()

dotenv.config({ path: '../.env'})

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.AWS_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
},
        region: bucketRegion})

  
  const maxSize = 5 * 1024 * 1024;

  const upload = multer({
   // storage: storage,
    limits: { fileSize: maxSize }
    });

  const randomImageName = (bytes = 18) => crypto.randomBytes(bytes).toString('hex')






router.get('/', protect, async (req, res) => {

  try {
    const data =  await PostGratitude.find({ user: req.user })

    for (let post of data){

    const getObjectParams = {
    Bucket: bucketName,
    Key: post.imageName
    }


    const command = new GetObjectCommand(getObjectParams);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });


    await PostGratitude.findByIdAndUpdate(post._id, {

    title: post.title,
    category: post.category,
    description: post.description,
    imageName: post.imageName,
    user: post.user,
    imageUrl: signedUrl
  })

}
  res.json(data)    
  }

  catch (error){
    console.log(error)
  }
})


router.get('/:id', (req, res) => {

  PostGratitude.findById(req.params.id)
      .then((data) => {
          return res.json(data)
      })
      .catch((err) => {
        console.log(err)
      })

})



  


router.post('/save', protect, upload.single('imageUrl'), async (req, res) => {

  
  if (typeof req.file === "undefined") {
  const newGratitude =  new PostGratitude({

    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    imageName: "sunset.jpg",
    imageUrl: "sunset.jpg",
    user: req.user
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
}

else {
  
  let newImageName

    newImageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: newImageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)


  const getObjectParams = {
    Bucket: bucketName,
    Key: newImageName
  }

  const command2 = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command2, { expiresIn: 20 });

  const newGratitude =  new PostGratitude({

    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    imageName: newImageName,
    imageUrl: url,
    user: req.user
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
      }
        })


 router.put('/edit', protect, upload.single('imageUrl'), async (req, res) => {


  let newImageUrl

 if (typeof req.file === "undefined") {
    newImageUrl = req.body.imageUrl
  } else {


  if (req.body.imageUrl != "sunset.jpg"){
    const params = {
  
      Bucket: bucketName,
      Key: req.body.imageName
    }
  
      const command = new DeleteObjectCommand(params)
  
      await s3.send(command)
  }

    let newImageName

    newImageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: newImageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)


  const getObjectParams = {
    Bucket: bucketName,
    Key: newImageName
  }

  const command2 = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command2, { expiresIn: 20 });

    newImageUrl = url;
  }
  
  const gratitudeId = req.body._id
  const user = await User.findById(req.user)

  // Check for user

  if (!user){
    res.status(401)
    throw new Error ('User not found')
  }

  try {
    await PostGratitude.findByIdAndUpdate(gratitudeId, 
      { user: user._id,
        title: req.body.title,
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
  const user = await User.findById(req.user)
    
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
  
  // Deletes S3 Image

  if (gratitude.imageUrl != "sunset.jpg"){
  const params = {

    Bucket: bucketName,
    Key: gratitude.imageName
  }

    const command = new DeleteObjectCommand(params)

    await s3.send(command)
}


    await PostGratitude.findByIdAndDelete(req.params.id)
      
    res.status(200).json("Gratitude deleted")
})


export { router }