const User = require('../models/User')
const bcrypt = require('bcrypt')
const { mutipleMongooseToObject } = require('../../util/handleBlockHbs')
const { mongooseToObject } = require('../../util/handleBlockHbs')


const AdminController = {

    index: async (req, res, next) => {

        res.render('admin/adminpage', { layout: 'admin' })

    },
    post: async (req, res, next) => {

        res.render('admin/adminPosts', { layout: 'admin' })

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

            const { role , status} = req.body
            await User.updateOne({ _id: req.params.id },{
                role: role,
                status: status
            })
        
            res.redirect('/admin/users')
            
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

}



module.exports = AdminController;