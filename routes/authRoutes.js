const {Router}=require('express');
const { signup_get, login_get, signup_post, login_post, logout } = require('../controllers/authController');
const { upload } = require('../middlewares/multer');
const router=Router();

router.get('/signup',signup_get)
router.get('/login',login_get)
router.post('/signup',upload.single('profile'),signup_post)
router.post('/login', upload.single('profile'), login_post)
router.get('/logout', logout)

module.exports = router;
