import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
},
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },

    refToken : { 
        type: String,
    }
},
{
    timestamps: true
}
)
const User =  mongoose.model('User', userSchema) 

export { User }