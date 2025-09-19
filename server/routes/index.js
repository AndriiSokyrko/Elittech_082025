const Router = require('express')

const router = new Router()
const userRouter = require('./userRoutes')
const flowerRouter = require('./flowerRoutes')
const purchaseRoutes = require('./purchaseRoutes');
const initializeRoles = require('../middleware/initializeRoles');

router.use(initializeRoles);

router.use('/user',userRouter)
router.use('/flowers', flowerRouter)
router.use('/purchases', purchaseRoutes);

module.exports = router