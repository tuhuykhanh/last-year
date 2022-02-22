const PostModel = require('../models/Post')

const { mutipleMongooseToObject } = require('../../util/handleBlockHbs')
const { mongooseToObject } = require('../../util/handleBlockHbs')

const path = require('path');

const PostController = {

    postDetail: async(req,res,next) => {
       
        const post = await PostModel.findOne({slug:req.params.slug})
        .populate('user')
        await res.render('post/postDetail',{
            post: mongooseToObject(post)
        })
    } 

}

module.exports = PostController;