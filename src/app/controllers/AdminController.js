const User = require('../models/User')
const PostsModel = require('../models/Post')

const bcrypt = require('bcrypt')
const { mutipleMongooseToObject } = require('../../util/handleBlockHbs')
const { mongooseToObject } = require('../../util/handleBlockHbs')
const AdminController = {

    index: async (req, res, next) => {
        res.render('admin/adminPage', { layout: 'admin' })
    },
    //load user page GET
    user: async (req, res, next) => {

        try {
            const user = await User.find({})
            if (!user)
                res.send('dont have any user')

            await res.render('admin/adminUsers', {
                users: mutipleMongooseToObject(user),
                layout: 'admin'
            })
        } catch (error) {
            console.log(error)
        }

    },
    //user edit GET
    userEdit: async (req, res, next) => {

       try {
           const user = await User.findOne({_id: req.params.id})
           if(!user)
                return res.status(400).json({ msg: err.message })
           await res.render('admin/adminUserEdit',{user:mongooseToObject(user) ,layout: 'admin'})

       } catch (error) {
            console.log(error)   
       }
   
    },
    //user edit POST
    userEditSm: async (req, res, next) => {
        try {

            const user = await User.findOne({ _id: req.params.id})

            let { role , status} = req.body  
            
            if(role === '')
                role = user.role
            if(status === '')
                status = user.status

            await User.updateOne({ _id: req.params.id },{
                role: role,
                status: status
            })
        
            res.redirect('/admin/users')
            
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    //delete user delete
    userDelete: async (req, res, next) => {
        try {
           const user = await User.findOne({ _id: req.params.id})
            
           if(user.role === 'admin')
            return res.redirect('/admin/users')
           
           await User.deleteOne({_id: req.params.id})

            res.redirect('/admin/users')
                
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    //////handle blogs //////
    post: async (req, res, next) => {
       
        try {
            const post = await PostsModel.find({})
            if (!post)
                res.send('dont have any post')

            await res.render('admin/adminPosts', {
                posts: mutipleMongooseToObject(post),
                layout: 'admin'
            })
        } catch (error) {
            console.log(error)
        }

    },
    formCreate: async (req, res, next) => {

        res.render('admin/adminCreatePost', { layout: 'admin' })
    },
    createPost: async (req,res,next) => {

        try {

            const { title, content, description, thumbnail } = req.body
            
            const newPost = new PostsModel({

                user: res.locals.lcuser._id,
                title: title.toLowerCase(), 
                content,
                description, 
                thumbnail: req.file.path.split('\\').slice(5,8).join('/'), 
            })

            await newPost.save()
            res.redirect('/admin/posts');
           
        } catch (error) {
            return res.status(500).json({ msg: error.message }) 
        }
    },
    postDelete: async(req,res,next) =>{
        try{
 
            await PostsModel.deleteOne({_id: req.params.id})
 
             res.redirect('/admin/posts')
            
        } catch (error) {
            return res.status(500).json({ msg: error.message })    
        }
    }


}



module.exports = AdminController;