const express = require('express');
const router = express();
const { Movement, db } = require("./db.js");
const cors = require('cors');

router.use(express.json());
router.use(cors());

router.post('/movement', async (req, res, next)=> {
    try {
        let {date, amount, operation, details, category, id} = req.body;
        if(operation === 'out') amount = -amount;
        const respuesta = await Movement.create({date, amount, operation, details, category, id});
        res.json({message: 'Operation added', respuesta});
    } catch (error) {
        console.log(error);
        next();
    }
});

router.get('/movement', async (req, res, next) => {
    try {
        const movements = await Movement.findAll({
            // attributes:  [total,[db.fn('sum', db.col('amount')), 'total']],
            order: [
                ['createdAt', 'ASC'],
            ],
        });
        let balance = 0;
        movements.forEach((m) => {
            balance += m.amount;
        });
        res.json({movements: movements, balance: balance});
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
