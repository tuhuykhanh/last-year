const Post = require('../models/Post')
const Author = require('../models/Author')


class HomeController
{
    index(req,res,next){

        Post.find({})
        .populate('list_author.author')
        .then( data =>{   
            
           res.render('home')   
           
        })
        .catch(err=> console.log(err))
    }
}

module.exports = new HomeController;