const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema  = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type:String,
        enum: ['TO LEARN',' LEARNING', 'LEARNED']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    list_author: {  
       author:{
           type: String,
           ref: 'authors'
       }
    }
   
},{
    timestamps: true,
})

module.exports = mongoose.model('news',PostSchema)