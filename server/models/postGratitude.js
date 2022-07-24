import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    imageUrl: String    
},
{collection: 'gratitudejournal'}
);

const PostGratitude = mongoose.model('gratitudejournal', postSchema)


export { PostGratitude }