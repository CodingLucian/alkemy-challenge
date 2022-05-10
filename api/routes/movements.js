const { Router } = require('express');
const { Movements } = require('../db')
const router = Router();


router.post('/', async (req, res, next)=> { 
    try {
        const { name, dificulty, duration, season, selectedCountries } = req.body;
        const newActivity = await Activities.findOrCreate({ 
            where: { 
                name, 
                dificulty,
                duration, 
                season 
            } 
        })
        // console.log("----------ACTIVIDAD CREADA?---> " + newActivity[1])
        await newActivity[0].addCountries(selectedCountries);  
        let response = await Activities.findByPk(newActivity[0].id, {
            include: Countries
        })  
        res.status(201).send(response)
    } catch(error){
        next(error);
    } 
})

router.delete('/:id', async (req, res, next)=> { 
    try {
        const id = req.params.id;
        // console.log("-----Action-delete-activity-id: " + id)
        const deleted = await Activities.destroy({ where: { id: id } });
        const remainingActivities = await Activities.findAll({
            include: Countries
        });    
        res.send(remainingActivities)
    } catch(error){
        next(error);
    } 
    
})

router.get('/', async (req, res, next)=>{
    // console.log("----activities--get---")
    try {
        const acti = await Activities.findAll({
            include: Countries
        })
        if(acti.length) {
            // console.log("---CON actividades---")
            return res.send(acti)
        }else{ 
            // console.log("---SIN actividades---")
            return res.sendStatus(404)
        }
    } catch (error) { 
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
  // console.log("----activities--get-with-:id--")
    try {
        let id = req.params.id;
        if(id){
          // console.log("----BACK-filter-by-activity----" + id)    
            const atci = await Activities.findByPk(id,{
                include: Countries
            })
            // console.log("---Countries with Activity from back---")
            // console.log(acti)
            res.send(atci)
        }else{
            const acti = await Activities.findAll()
            if(acti.length) {
              // console.log("---CON actividades---")
                return res.send(acti)
            }else{ 
              // console.log("---SIN actividades---")
                return res.sendStatus(404)
            }
        }
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;
