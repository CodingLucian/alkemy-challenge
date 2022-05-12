const express = require('express');
const router = express();
const { /* Movement, */ db } = require("./db.js");

// router.get('/', (req, res) => {
//     res.send('Budget');
// });

router.use(express.json());

router.post('/movement', async (req, res, next)=> {
    try {
        await Movement.create(req.body);
        res.json({message: 'Operation added'});
    } catch (error) {
        console.log(error);
        next();
    }
});

router.get('/movement', async (req, res, next) => {
    try {
        const movements = await Movement.findAll();
        res.json(movements);
    } catch (error) {
        console.log(error);
        next();
    }
});

router.get('/movement/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        const operation = await Movement.findByPk(id);
        res.json(operation);
    } catch (error) {
        console.log(error);
        next();
    }
});

router.put('/movement/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        const {category, details, amount, operation } = req.body;
        await Movement.update(
            {
                category,
                details,
                amount,
                operation
            },
            {where: 
                {id: id}});

        const movement = await Movement.findByPk(req.params.id);
        res.json(movement);

    } catch (error) {
        console.log(error);
        next();
    }
});

router.delete('/movement/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        await Movement.destroy({ where: 
            {id: id}
        });
        res.json({mensaje: 'operation deleted'});
    } catch (error) {
        console.log(error);
        next();
    }
});

router.listen(3001, () => {
    console.log('server running on port 3001');
    db.sync({force: true});
});

// module.exports = {
//     router
// }
