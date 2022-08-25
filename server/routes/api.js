import express from "express"
import { protect } from '../middleware/authMiddleware.js'
import { getGratitudes, addGratitude, getSingleGratitude, editGratitude, deleteGratitude } from '../controllers/gratitudeController.js'
import multer from 'multer'
  
const router = express.Router()



// Sets Multer storage options

  const maxSize = 5 * 1024 * 1024;

  const upload = multer({
    limits: { fileSize: maxSize }
    });


router.get('/', protect, getGratitudes)    

router.get('/:id',  protect, getSingleGratitude)

router.post('/save', upload.single('imageUrl'), protect, addGratitude)

router.put('/edit',upload.single('imageUrl'),  protect, editGratitude)

router.delete('/:id', protect, deleteGratitude)



export { router }