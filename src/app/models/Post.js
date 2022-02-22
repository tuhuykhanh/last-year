const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const PostSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    title: {
        type: String,
        require: true,
        trim: true,
        minLength: 10,
        maxLength: 100
    },
    content: {
        type: String,
        require: true,
        minLength: 100
    },
    description: {
        type: String,
        require: true,
        trim: true,
        minLength: 50,
       
    },
    thumbnail:{
        type: String,
        require: true
    },
    slug: { 
        type: String, 
        slug: 'title',
        unique:true }
    
}, {
    timestamps: true,
})
mongoose.plugin(slug)

module.exports = mongoose.model('posts', PostSchema)