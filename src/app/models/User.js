const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        minlength: 2},
    email: {type: String, 
        unique: true,
         required: true, 
         trim: true},
    role: {type: String, 
        enum: ['admin', 'customer']},
    password: {type: String, 
        required: true, 
        trim: true, 
        minlength: 6},
    password_confirm: {type: String, 
            required: true,
            trim: true, 
            minlength: 6},
    avatar: {type: String,
        trim: true},
    address:{
            type: String,
            trim: true,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('users', UserSchema)