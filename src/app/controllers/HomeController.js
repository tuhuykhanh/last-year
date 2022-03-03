const PostModel = require('../models/Post')
const CategoryModel = require('../models/Category')
const Author = require('../models/Author')
var fs = require('fs');

const { mutipleMongooseToObject } = require('../../util/handleBlockHbs')
const { mongooseToObject } = require('../../util/handleBlockHbs')

const path = require('path');

const HomeController = {

    index: async (req, res, next) => {
        try {

            const post = await PostModel.find({}).sort({
                createdAt: -1
            }).populate('user')
            const category = await CategoryModel.find({})
            
            await res.render('home', {
                posts: mutipleMongooseToObject(post),
                categorys: mutipleMongooseToObject(category)
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    searchPage: async (req, res, next) => {

        try {
            res.render('search/searchPage')

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
    
}

module.exports = HomeController;