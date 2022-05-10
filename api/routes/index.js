const { Router } = require('express');
const movementsRoutes = require('./movements');


const router = Router();

router.use('/movements', movementsRoutes);

module.exports = router;
 