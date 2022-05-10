import { Movement } from "../models/Movements.js";
import express from 'express';
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Budget');
// });

router.post('/movements', async (req, res, next)=> {
    try {
        await Movement.create(req.body);
        res.json({message: 'Operation added'});
    } catch (error) {
        console.log(error);
        next();
    }
});

router.get('/movements', async (req, res, next) => {
    try {
        const movements = await Movement.findAll();
        res.json(movements);
    } catch (error) {
        console.log(error);
        next();
    }
});

router.get('/movements/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        const operation = await Movement.findByPk(id);
        res.json(operation);
    } catch (error) {
        console.log(error);
        next();
    }
});

router.put('/movements/:id', async (req, res, next) => {
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

router.delete('/movements/:id', async (req, res, next) => {
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

export default router;
