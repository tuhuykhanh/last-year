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

        
             res.redirect('/account/profile')
         })
         .catch(next)
        
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
            if (user == null) { //Kiểm tra xem email đã được sử dụng chưa
                bcrypt.hash(req.body.password, 10, function (err, hash) { //Mã hóa mật khẩu trước khi lưu vào db
                    if (err) { return next(err); }
                    const user = new User(req.body)
                    user.role = 'customer' //sau khi register thì role auto là customer
                    user.password = hash;
                    user.password_confirm = hash;
                    //default avatar
                    user.avatar = 'uploads/avatar-1644396883170-37070774.jpg'
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