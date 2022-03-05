const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    iduser: { 
       type: mongoose.Types.ObjectId, 
       ref: 'users', 
       require: true},
    idpost: {
        type: mongoose.Types.ObjectId,
        ref: 'posts', 
        require: true,
    },
    content: { 
        type: String, 
        required: true },
    
},{
    timestamps: true
})

module.exports = mongoose.model('comments',CommentSchema)