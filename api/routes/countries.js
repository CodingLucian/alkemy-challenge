const { Router } = require('express');
const { Countries, Activities } = require('../db')
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize');


//////////////////////////////// INITIALIZING DATABASE ////////////////////////
router.get('/start', async (req, res, next)=>{
    var menosInfo = undefined;
    try {
        const aux = await Countries.findAll({
            attributes: ['name', 'flag', 'continent', 'id', 'population']
        })  
        if(aux.length > 100) return res.send(aux) 
        // console.log("-----CARGANDO DB DESDE ENDPOINT---------") 
        const allCountries = await axios.get('https://restcountries.com/v3/all' ) 
        menosInfo = allCountries.data.map( c => {   
            if(c.capital){
                return {
                    id: c.cca3,
                    name: c.name.common,
                    flag: c.flags[1], 
                    continent: c.region,
                    capital: c.capital[0],
                    subregion: c.subregion,
                    area: parseInt(c.area),
                    population: parseInt(c.population),
                    
                }  
            }else{                
                return {
                    id: c.cca3,
                    name: c.name.common,
                    flag: c.flags[1],
                    continent: c.region,
                    capital: " ",
                    subregion: c.subregion,
                    area: parseInt(c.area),
                    population: parseInt(c.population),
                    
                }    
            }
        })
        await menosInfo.forEach(async (c) => {  
            await Countries.create({
                    id: c.id,
                    name: c.name,
                    flag: c.flag,
                    continent: c.continent,
                    capital: c.capital,
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population,
                    

            })
        })
        // console.log("--------------DB-CREADA---------------" )
        const countries = await Countries.findAll({
            attributes: ['name', 'flag', 'continent', 'id', 'population']
        });
        // console.log("--------------DB-A-FRONT-CARGA-COUNTRIES--------------")
        // console.log(countries)
        return res.send(countries) 
    }catch (error) {
        next(error);
    } 
});


/////////////////// GET COUNTRIES BY NAME or ALL///////////////////////

router.get('/', async (req, res, next)=>{  
    var menosInfo = null;
    if(req.query.name){   
        try {
            const countries = await Countries.findAll({
                where:{
                    name: { 
                        [Op.iLike]: `%${req.query.name}%`
                    }
                },
                attributes: {
                    include: ['name', 'flag', 'continent', 'id', 'population']
                },
            })
            if(countries){ return res.send(countries)}
            else { res.status(404).send('No such country')}
        } catch (error) {
            next(error);
        }
    }else{    
        try {
            const countries = await Countries.findAll({
                attributes: ['name', 'flag', 'continent', 'id', 'population']
            })
            return res.send(countries)
        } catch (error) {
            next(error);
        }
    }
});


/////////////////////////////ENVIO AL FRON LOS DETALLES DEL PAIS SOLICITADO////////////////////////////////
router.get('/details/:id', (req, res)=>{ 
    const id = req.params.id;
    Countries.findByPk(id,{
        include: Activities       
    }).then((response)=>
        res.status(200).send(response)
    ).catch((error) => console.log(error))
}) 

module.exports = router;
