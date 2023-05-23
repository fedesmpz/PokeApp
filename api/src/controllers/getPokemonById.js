const axios = require('axios')
const { Pokemon, Type } = require('../db')
const URL = 'https://pokeapi.co/api/v2/pokemon'


const getPokemonById = async (req, res) =>{

    const {id} = req.params

    if (id >= 100000){
        try{
        const pkmnDB = await Pokemon.findByPk(id, {
            include: Type
        })
        const types = pkmnDB.types.map(type => type.name)

        const pkmn = {
            id: pkmnDB.id,
            name: pkmnDB.name,
            image: pkmnDB.image,
            hp: pkmnDB.hp,
            attack: pkmnDB.attack,
            defense: pkmnDB.defense,
            speed: pkmnDB.speed,
            height: pkmnDB.height,
            weight: pkmnDB.weight,
            types: types
          };
          
            return res.status(200).json(pkmn)
    
        }catch(error){
            return res.status(500).json(error.message)
        }
    }else{
        try{
            const {data} = await axios.get(`${URL}/${id}`)
            const pkmn = {
                id: id,
                name: data.name,
                image: data.sprites.other.home.front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map(type => type.type.name)
    
             }
             return res.status(200).json(pkmn)
    
        }catch(error){
            return res.status(500).json(error.response.data)
        } 
    }
}

module.exports = {
    getPokemonById
}