const mongoose = require('mongoose');
const thought = require('./thoughtModel');

const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please fill out a valid email address']
        }, 
        thoughts: [
            mongoose.Schema.Types.ObjectId
        ] 
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;