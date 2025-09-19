const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const passport = require("passport");


router.post('/registration',userController.registration)
router.patch('/reset',passport.authenticate('jwt', { session: false }),userController.resetPassword)
router.post('/login', userController.login)
router.post('/admin', userController.create)
// router.get('/auth', authMiddleware, userController.auth)
router.post('/auth',  passport.authenticate('jwt', { session: false }), userController.auth)
router.post('/check',  passport.authenticate('jwt', { session: false }), userController.checkPassword)
// router.get('/', authMiddleware, userController.getAll)
router.get('/', passport.authenticate('role', { session: false }), userController.getAllUsers)
router.get('/:id', userController.getByUserId);
router.patch('/update',userController.updateByUserId);
router.delete('/:id', userController.deleteByUserId);
module.exports = router