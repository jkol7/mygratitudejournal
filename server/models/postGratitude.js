import mongoose from 'mongoose'


const postSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { type: String, required: false},
    category: { type: String, required: false},
    description: { type: String, required: false},
    imageName: { type: String, required: false},
    imageUrl: { type: String, required: false}   
},
{collection: 'gratitudejournal'},
{timestamps: true}
);

const PostGratitude = mongoose.model('gratitudejournal', postSchema)


export { PostGratitude }