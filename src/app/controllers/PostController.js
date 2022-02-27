const PostModel = require('../models/Post')
const CategoryModel = require('../models/Category')

const { mutipleMongooseToObject } = require('../../util/handleBlockHbs')
const { mongooseToObject } = require('../../util/handleBlockHbs')

const path = require('path');

const PostController = {

    postDetail: async(req,res,next) => {

        const post = await PostModel.findOne({slug:req.params.slug})
        .populate('user category')
        await PostModel.updateOne({slug:req.params.slug},{views: post.views + 0.5})
        await res.render('post/postDetail',{
            post: mongooseToObject(post)
        })
    },
    getvalue: async (req, res, next) => {
        try {

            let payload = req.body.payload.trim();
            let result = await PostModel.find({title: {$regex: new RegExp('^'+payload+'.*')}}).exec();
            result = result.slice(0,10);
            res.send({payload: result})

        } catch (error) {

            return res.status(500).json({ msg: error.message })

        }
    }

}

module.exports = PostController;