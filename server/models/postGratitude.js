import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    imageURL: String
    
},
{collection: 'gratitudejournal'}
);

const PostGratitude = mongoose.model('gratitudejournal', postSchema)


export { PostGratitude }

/*

DUMMY DATA


const data = {
    title: "Gregory",
    category: "person",
    description: "This is greg",
    imageURL: "gregory.jpg",
}


const newGratitude = new PostGratitude(data)


newGratitude.save((error) => {
    if (error) {
        console.log('error')
    }
    else {
        console.log('Data saved')
    }
}
)
*/