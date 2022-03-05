
const CommentModel = require('../models/Comment')
const UserModel = require('../models/User')
const PostModel = require('../models/Post')

const { mutipleMongooseToObject } = require('../../util/handleBlockHbs')
const { mongooseToObject } = require('../../util/handleBlockHbs')

const path = require('path');

const HomeController = {


    savecomment: async (req,res) =>{
        try {

           const { email , slug , comment } = req.body
            
           const user =await UserModel.findOne({email: email})
           const post =await PostModel.findOne({slug: slug})

           const newComment = new CommentModel({
            iduser: user._id,
            idpost: post._id,
            content: comment
           })
           await newComment.save();


        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}
module.exports = HomeController;