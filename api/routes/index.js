const { Router } = require('express');
const activitiesRoute = require('./activities');
const countriesRoute = require('./countries');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/countries', countriesRoute);
router.use('/activities', activitiesRoute);

module.exports = router;
 