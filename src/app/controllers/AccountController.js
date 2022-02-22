const User = require('../models/User')
const bcrypt = require('bcrypt')
const { mutipleMongooseToObject } = require('../../util/handleBlockHbs')
const { mongooseToObject } = require('../../util/handleBlockHbs')

const AccountController = {
    //form login
    login: async (req, res, next) => {
        res.render('account/login')
    },
    //form profile

    profile: async (req, res, next) => {
        res.render('account/profile')
    },

    profileEdit: async (req, res, next) => {
        res.render('account/profile_edit')
    },

    //update user from user
    update(req, res, next) {

        User.findOne({ _id: req.params.id })
            .then(user => {
                if (!req.file) {
                    User.updateOne({ _id: req.params.id }, {
                        username: req.body.username,
                        address: req.body.address,
                    })
                        .then(() => {
                            //update session
                            //set name
                            req.session.user.username = req.body.username
                            res.locals.lcuser.username = req.session.user.username

                            //set address
                            req.session.user.address = req.body.address
                            res.locals.lcuser = req.session.user

                            res.redirect('/account/profile')
                        })
                        .catch(next)
                } else {
                    User.updateOne({ _id: req.params.id }, {
                        username: req.body.username,
                        avatar: req.file.path.split('\\').slice(5, 7).join('/'),
                        address: req.body.address,
                    })
                        .then(() => {
                            //update session
                            //set name

                            req.session.user.username = req.body.username
                            res.locals.lcuser.username = req.session.user.username

                            //set avata 
                            req.session.user.avatar = req.file.path.split('\\').slice(5, 7).join('/')
                            res.locals.lcuser = req.session.user

                            //set address
                            req.session.user.address = req.body.address
                            res.locals.lcuser = req.session.user

                            res.redirect('/account/profile')
                        })
                        .catch(next)
                }
            })
    },

    logout: async (req, res, next)=> {
        try {
            if (req.session) {
                req.session.destroy(function (err) {
                    if (err) {
                        return res.json({ err });
                    } else {
                        return res.redirect(req.headers.referer)
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },
    //form register
    register: async (req, res, next) => {
        res.render('account/register')
    },
    //form reset password
    resetpassword: async (req, res, next) => {
        res.render('account/resetpassword')
    },
    changepass: async (req, res, next) => {
        res.render('account/changepassword')
    },
    changepasspost: async (req, res, next) => {
        try {
            const { oldpassword ,newpassword } = req.body
            const user = await User.findOne({ _id: req.params.id })
            if (!user)
                return res.status(500).json({ msg: err.message })
            const isMatch = await bcrypt.compare(oldpassword, user.password)
            if (!isMatch) return res.render('account/changepassword', {
                err: 'old password incorrect',
            })
            const passwordHash = await bcrypt.hash(newpassword, 12);
            await User.updateOne({_id: req.params.id}, {
                password: passwordHash
            })

            res.redirect('/account/profile')

        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //login function
    loginsubmit: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            if (!user) return res.render('account/login', {
                err: 'This email does not exist.'
            })
            if(user.status === 'lock')
                return res.render('account/login', {
                    err: 'your account has been locked !!!'
                })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.render('account/login', {
                errpass: 'password incorrect'
            })
            req.session.isLogged = true;
            req.session.user = user

            if (req.session.user.role === 'admin') {
                req.session.isAdmin = true
            }

            const url = req.query.reURL || '/account/profile'
            res.redirect(url)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    //register user
    store: async (req, res, next) => {
        try {
            const { username, email, password } = req.body

            const user = await User.findOne({ email: email })
            if (user) return res.render('account/register', {
                err: 'email has been used',
            })
            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new User({
                username, email, password: passwordHash
            })
            await newUser.save();

            res.redirect('/account/login')

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = AccountController;