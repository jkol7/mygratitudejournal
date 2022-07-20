import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    imageURL: String
});

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage