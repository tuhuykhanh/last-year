
class CheckLogOut {

    requiresLogout(req, res, next){
        if (req.session && req.session.user) {
             return res.json({err: 'You must be Logout in to Login continue'});        
        } else {
            return next();
        }
    }
    requiresLogin(req, res, next) {
        if (req.session && req.session.user) {
            return next();
        } else {
            return res.redirect(`/account/login?reURL=${req.originalUrl}`);
        }
    }
    checkLocalAuthen(req,res,next){

        if(req.session === null)
        {
            req.session.isLogged = false;
        } 
        res.locals.lcisLogged =  req.session.isLogged
        res.locals.lcuser =  req.session.user
        next(); 
    }
    
    isAdmin(req, res, next){
        if(res.locals.lcuser.role === 'admin'){
            next()
        }else{
            res.send('not admin')
        }
    }

}

module.exports = new CheckLogOut;