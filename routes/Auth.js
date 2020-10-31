const router = require('express').Router()
const SignupUser = require('../controllers/Auth/Signup')
const LoginUser = require('../controllers/Auth/Login')
const Logout = require('../controllers/Auth/Logout')
const ChangePassword = require("../controllers/Auth/ChangePassword")

const authRequired = require("../middleware/AuthRequired")

router.post('/signup', SignupUser)
router.post('/login', LoginUser)
router.get("/logout",authRequired,Logout)

router.put("/update_password",authRequired,ChangePassword)
module.exports = router
