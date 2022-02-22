const express = require('express')
const router = express.Router();
const checklogout = require('../app/middlewares/CheckLogOut')
const adminConstroller = require('../app/controllers/AdminController')


const path = require('path');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/img/thumbnail-post'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg') 
    }
  })
const upload = multer({ storage: storage })



router.delete('/post/delete:id',checklogout.authAdmin, adminConstroller.postDelete)
router.delete('/user/delete:id',checklogout.authAdmin, adminConstroller.userDelete)

router.get('/edit:id',checklogout.authAdmin, adminConstroller.userEdit)
//edit user
router.post('/edit:id',checklogout.authAdmin, adminConstroller.userEditSm)

router.get('/users',checklogout.authAdmin, adminConstroller.user)

router.get('/create',checklogout.authAdmin, adminConstroller.formCreate)

router.post('/create',upload.single('thumbnail'),checklogout.authAdmin, adminConstroller.createPost)

router.get('/posts',checklogout.authAdmin, adminConstroller.post)

router.get('/',checklogout.requiresLogin,checklogout.authAdmin, adminConstroller.index)



module.exports = router;
