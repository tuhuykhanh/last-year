const express = require('express')
const router = express.Router();


const checklogout = require('../app/middlewares/CheckLogOut')

router.get('/',checklogout.authAdmin, (req,res,next) =>{
    res.send('admin page')
})

module.exports = router;
