const Router = require('express')

const router = new Router()
const userRouter = require('./userRoutes')
const flowerRouter = require('./flowerRoutes')
const shopRouter = require('./shopRoutes')
const categoryRouter = require('./categoryRoutes')
const purchaseRoutes = require('./purchaseRoutes');
const initializeRoles = require('../middleware/initializeRoles');

router.use(initializeRoles);

router.use('/user',userRouter)
router.use('/flowers', flowerRouter)
router.use('/shops', shopRouter)
router.use('/categories', categoryRouter)
router.use('/purchases', purchaseRoutes);

module.exports = router