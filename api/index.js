const express = require('express');
const router = express();
const { Movement, db, Users, RefTkn } = require("./db.js");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.use(express.json());
router.use(cors());


// REGISTRATION
router.post('/user/register', async (req, res) => {
    try {
        // console.log('register back', req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { email: req.body.email, fullname: req.body.fullname, password: hashedPassword }
        const createdUser = await Users.create(user)
        res.status(301).send({msg: 'user created', redirect: '/'})
    } catch {
        res.status(500).send()
    }
    })

// LOGIN    
router.post('/user/login', async (req, res) => {
    const {email, password} = req.body
    const user = await Users.findAll({ where: { email: email } })
    if (!user[0]) {
        // console.log('user ', user)
        return res.status(400).send({success: false, message: 'invalid user or password'})
    }
    const userForToken = { id: user[0].dataValues.id, username: user[0].dataValues.fullname };
    try {
        let validPassword = await bcrypt.compare(password, user[0].dataValues.password);
        if(!validPassword){
            res.status(401).json({success: false, message: 'invalid user or password'});
        } else {
            const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            // const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET)
            // await RefTkn.create({reftkn: refreshToken})
            res.json({ userName: email, accessToken, /* refreshToken, */ redirect: '/home' })
        }
    } catch(error) {
        res.status(500).send({msg: 'login error', error: error})
    }
})

// router.post('/token', async (req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return res.sendStatus(401)
//     const aux = await RefTkn.findAll({ where: { reftkn: refreshToken } } )
//     if (aux === false) {
//         console.log('aux false--->',aux)
//         return res.sendStatus(403)
//     }
//     console.log('aux true--->',aux)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403)
//       const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
//       res.json({ accessToken: accessToken })
//     })
// })

//Log Out

// router.delete('/user/logout', async (req, res) => {
//     const token = req.headers.authorization.substring(7);
//     const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
//     console.log('logout back')
//     if(!token || !decodedToken.id){
//         return res.status(401).json({error: 'no valid token'})
//     }
//     const aux = await RefTkn.drop({ where: { reftkn: token } })
//     res.status(204).json({message: 'Logged Out Succesfully', redirect: '/'})
// })

// NEW OPERATION
router.post('/movement', async (req, res, next)=> {
    try {
        let {date, amount, operation, details, category, id} = req.body;
        // const authorization = req.get('authorization');
        console.log('req.headers.username.substring(7): ', req.headers.username)
        const token = req.headers.authorization.substring(7);
        const username = req.headers.username;
        console.log('postr movement username: ', username)
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!token || !decodedToken.id){
            return res.status(401).json({error: 'no valid token'})
        }
        if(operation === 'out') amount = -amount;
        const respuesta = await Movement.create({username, date, amount, operation, details, category, id});
        res.json({message: 'Operation added', respuesta});
    } catch (error) {
        console.log(error);
        next();
    }
});

router.get('/movement', async (req, res, next) => {
    try {
        const token = req.headers.authorization.substring(7);
        const username = req.headers.username;
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!token || !decodedToken.id){
            return res.status(401).json({error: 'no valid token'})
        }
        const movements = await Movement.findAll({
            // attributes:  [total,[db.fn('sum', db.col('amount')), 'total']],
            order: [
                ['date', 'ASC'],
                ['createdAt', 'ASC']
            ],
            where: 
                {username: username}
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

// router.get('/movement/:id', async (req, res, next) => {
//     try {
//         let id = req.params.id
//         const operation = await Movement.findByPk(id);
//         res.json(operation);
//     } catch (error) {
//         console.log(error);
//         next();
//     }
// });

router.put('/movement/:id', async (req, res, next) => {
    try {
        const token = req.headers.authorization.substring(7);
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!token || !decodedToken.id){
            return res.status(401).json({error: 'no valid token'})
        }
        let id = req.params.id
        let {category, details, date, amount, operation } = req.body;
        if(operation === 'out') amount = -amount;
        await Movement.update(
            {
                category,
                details,
                date,
                amount,
                operation
            },
            {where: 
                {id: id}});

        const movement = await Movement.findByPk(id);
        res.json(movement);

    } catch (error) {
        console.log(error);
        next();
    }
});

router.delete('/movement/:id', async (req, res, next) => {
    try {
        const token = req.headers.authorization.substring(7);
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!token || !decodedToken.id){
            console.log('delete no  valid token')
            return res.status(401).json({error: 'no valid token'})
        }
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
