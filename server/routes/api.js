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

  


router.get('/', async (req, res) => {

   await PostGratitude.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
          next(err)
        })

})



router.get('/:id', (req, res) => {

  PostGratitude.findById(req.params.id)
      .then((data) => {
          return res.json(data)
      })
      .catch((err) => {
        next(err)
      })

})




router.post('/save', upload.single('imageUrl'), (req, res) => {

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


 router.put('/edit', upload.single('imageUrl'), async (req, res) => {

 

  const newTitle = req.body.title 
  const newCategory = req.body.category
  const newDescription = req.body.description
  const newImageUrl = req.file.filename
  const id = req.body._id


  try {
    await PostGratitude.findByIdAndUpdate(id, 
      {title: newTitle,
       category: newCategory,
       description: newDescription,
       imageUrl: newImageUrl})
  }

  catch (error){
    console.log(error)
  }
})
    

router.delete('/:id', async (req, res) => {
  try {

    await PostGratitude.findByIdAndDelete(req.params.id)
      
    res.status(200).json("Gratitude deleted")

  } catch (err){

    next(err)

}
})


  /*
    const newGratitude = new PostGratitude({

        title: req.body.title

    })

    PostGratitude.findByIdAndUpdate(req.params.id, req.body)
      .then(data => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );

      */



export { router }