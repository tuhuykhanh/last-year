const express = require('express')
const router = express.Router();


const checklogout = require('../app/middlewares/CheckLogOut')


router.get('/',checklogout.isAdmin, (req,res,next) =>{
    res.send('admin page')
})

module.exports = router;
