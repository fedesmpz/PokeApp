const axios = require('axios')
const URL = 'https://pokeapi.co/api/v2/pokemon'
const { Pokemon, Type } = require('../db')
const { Op, QueryTypes } = require('sequelize');

const getPokemonByName = async (req, res) => {

    const name = req.query.name

    if (name) {
      try {
        const pkmnsBD = await Pokemon.findAll({
          where: {
            name: {
              [Op.iLike]: `${name}`,
            },
          },
          include: Type,
        });
    
        const pkmnsFromDB = pkmnsBD.map((pkm) => ({
          id: pkm.id,
          name: pkm.name,
          image: pkm.image,
          hp: pkm.hp,
          attack: pkm.attack,
          defense: pkm.defense,
          speed: pkm.speed,
          height: pkm.height,
          weight: pkm.weight,
          types: pkm.types.map((type) => type.name),
        }));
    
        // let pkmn = null;
        // try {
        //   const { data } = await axios(`${URL}/${name}`);
        //   pkmn = {
        //     name: data.name,
        //     image: data.sprites.other.home.front_default,
        //     hp: data.stats[0].base_stat,
        //     attack: data.stats[1].base_stat,
        //     defense: data.stats[2].base_stat,
        //     speed: data.stats[5].base_stat,
        //     height: data.height,
        //     weight: data.weight,
        //     types: data.types.map((type) => type.type.name),
        //   };
        // } catch (error) {
        //   console.log(`No se encontró ningún Pokémon con el nombre "${name}" en la API`);
        // }
    
        // const results = [pkmn, ...pkmnsFromDB].filter((result) => result !== null);
    
        return res.status(200).json(pkmnsFromDB);
      } catch (error) {
        if (error.response && error.response.data) {
          return res.status(500).json(error.response.data);
        } else {
          return res.status(500).json(error.message);
        }
      }
    
    
    }else{
        try{
            // const arrPkmnApi =[];
            let arrPkmnDB = [];
            // const { data } = await axios(`${URL}?limit=60`) //se sdeteo en 40 dado el tiempo que se demora en traer todos los pokemons
            // const totalPkmns = data.results.length
            // for (let i = 0; i < totalPkmns; i++) {
            //     const {data} = await axios(`${URL}/${i+1}`)
            //     const pkmn = {
            //         id: i+1,
            //         name: data.name,
            //         image: data.sprites.other.home.front_default,
            //         hp: data.stats[0].base_stat,
            //         attack: data.stats[1].base_stat,
            //         defense: data.stats[2].base_stat,
            //         speed: data.stats[5].base_stat,
            //         height: data.height,
            //         weight: data.weight,
            //         types: data.types.map(type => type.type.name)                
            //         }
            //      arrPkmnApi.push(pkmn)
            //     }

            //traigo los pkm de la db
            const arrDb = await Pokemon.findAll({
                include: Type
            })

            //los guardo por sus datos y les asigno el tipo
            const arrTmp = arrDb.map(pkm => pkm.dataValues)

            arrPkmnDB = await arrTmp.map(pkm => {
                const types = pkm.types.map(type => type.name)
                    const pkmn = {
                        id: pkm.id,
                        name: pkm.name,
                        image: pkm.image,
                        hp: pkm.hp,
                        attack: pkm.attack,
                        defense: pkm.defense,
                        speed: pkm.speed,
                        height: pkm.height,
                        weight: pkm.weight,
                        types: types
                      };
                return pkmn
            })
                
            return res.status(200).json(arrPkmnDB)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}


module.exports = {
    getPokemonByName
}