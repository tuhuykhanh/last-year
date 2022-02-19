const express = require('express')
const router = express.Router();


const checklogout = require('../app/middlewares/CheckLogOut')
const adminConstroller = require('../app/controllers/AdminController')




router.get('/edit:id',checklogout.authAdmin, adminConstroller.userEdit)
router.post('/edit:id',checklogout.authAdmin, adminConstroller.userEditSm)

router.get('/users',checklogout.authAdmin, adminConstroller.user)

router.get('/posts',checklogout.authAdmin, adminConstroller.post)

router.get('/',checklogout.authAdmin, adminConstroller.index)



module.exports = router;
