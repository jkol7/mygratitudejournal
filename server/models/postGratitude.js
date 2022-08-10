import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    title: { type: String, required: false},
    category: { type: String, required: false},
    description: { type: String, required: false},
    imageUrl: { type: String, required: false}    
},
{collection: 'gratitudejournal'}
);

const PostGratitude = mongoose.model('gratitudejournal', postSchema)


export { PostGratitude }