const User = require('../models/User')
const bcrypt = require('bcrypt')
const {mutipleMongooseToObject} = require('../../util/handleBlockHbs')
const {mongooseToObject} = require('../../util/handleBlockHbs')

class AccountController {
    //form login
    login(req, res, next) {
        res.render('account/login')
    }
    //form profile

    profile(req, res, next) {   
         res.render('account/profile')
    }

    profileEdit(req,res,next){
        res.render('account/profile_edit')
    }
    
    //update user from user
    update(req,res,next){

        User.findOne({ _id: req.params.id})
        .then(user => {
            if(!req.file)
            {
                User.updateOne({ _id: req.params.id},{
                    username: req.body.username,
                    address:  req.body.address,
                })
                 .then( ()=>{ 
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
            }else
            {
                User.updateOne({ _id: req.params.id},{
                    username: req.body.username,
                    avatar: req.file.path.split('\\').slice(5,7).join('/'),
                    address:  req.body.address,
                })
                 .then( ()=>{ 
                    //update session
                    //set name
                     
                    req.session.user.username = req.body.username
                    res.locals.lcuser.username = req.session.user.username
                    
                    //set avata 
                    req.session.user.avatar = req.file.path.split('\\').slice(5,7).join('/')
                    res.locals.lcuser = req.session.user
        
                    //set address
                    req.session.user.address = req.body.address
                    res.locals.lcuser = req.session.user
                   
                     res.redirect('/account/profile')
                 })
                 .catch(next)
            }
        })   
    }

    logout(req,res,next){
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    return res.json({err});
                } else {
                    return res.redirect(req.headers.referer)
                }
            });
        }    
    }
    //form register
    register(req, res, next) {
        res.render('account/register')
    }
    //form reset password
    resetpassword(req, res, next) {
        res.render('account/resetpassword')
    }
    changepass(req,res,next){
        res.render('account/changepassword')
    }
    changepasspost(req,res,next)
    {
        User.findOne({_id:req.params.id})
        .then(user =>{
            bcrypt.compare(req.body.oldpassword, user.password, (err, result) => {
                if(result)
                {  
                    bcrypt.hash(req.body.newpassword, 10, function (err, hash) {
                        if (err) { return next(err); }

                        const new_password = hash;
                        const new_password_confirm = hash;

                        User.updateOne({ _id: req.params.id},{
                            password: new_password,
                            password_confirm: new_password_confirm
                        })
                        .then(res.redirect('/account/profile'))
                        .catch(next)
                    })        
                }
                else
                {
                    res.render('account/changepassword',{
                        err: 'old password incorrect',
                    })
                }

                 
            })
        }) 
    }

    //login function
    loginsubmit(req,res,next){
        const email =  req.body.email
        User.findOne({email: email}).exec(function(err, user){
            if(err) {
                return res.json({err})
            }else if (!user){
                return res.render('account/login',{
                    err: 'email and Password are incorrect'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result === true){
                    
                    req.session.isLogged = true;
                    req.session.user = user

                    if(req.session.user.role === 'admin')
                    {
                    req.session.isAdmin = true
                    }

                   
                     
                    const url = req.query.reURL || '/account/profile'
                    res.redirect(url)


                }else{
                    return res.render('account/login',{
                        err: 'email and Password are incorrect'
                    })
                }
            })
        })   
    }
    //register user
    store(req, res, next) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (user == null) { 
                bcrypt.hash(req.body.password, 10, function (err, hash) { 
                    if (err) { return next(err); }
                    const user = new User(req.body)

                    user.password = hash;
                  
                    user.save()
                        .then( ()=> {
                            res.redirect('/account/login')
                        })
                        .catch(next)
                })
            } else {
                res.render('account/register',{
                    err: 'email has been used',
                })
            }
        })
    }
    
}

module.exports = new AccountController;