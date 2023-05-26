const axios = require('axios')
const { Pokemon, Type } = require('../db')
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon';
const URL_TYPE = 'https://pokeapi.co/api/v2/type'

const getPokemonByType = async (req, res) => {
    const typeReq = req.params.type;
    
    try{
      const pokemonesDB = await getByTypesInBD(typeReq)
        
    //     if(pokemonesDB.length > 0){
    //         return res.status(200).json(pokemonesDB)
    //     }

    //     const { data } = await axios.get(`${URL_TYPE}/${typeReq}`)
    //     const arrPokmn = data.pokemon
    //     const pokemones = await Promise.all(arrPokmn.map(async (pokemon) => {
    //         const {data} = await axios.get(`${URL_BASE}/${pokemon.pokemon.name}`)

    //         const pkmn = {
    //             id: data.id,
    //             name: data.name,
    //             image: data.sprites.other.home.front_default,
    //             hp: data.stats[0].base_stat,
    //             attack: data.stats[1].base_stat,
    //             defense: data.stats[2].base_stat,
    //             speed: data.stats[5].base_stat,
    //             height: data.height,
    //             weight: data.weight,
    //             types: data.types.map(type => type.type.name)
    //             }
    //         await setInBD(pkmn)
    //         return pkmn
    //     }))
        return res.status(200).json(pokemonesDB)
   
    }catch(error){
        return res.status(500).json(error.message)
    }
}



const getByTypesInBD = async (type) => {
  const pokemones = await Pokemon.findAll({
    include: {
      model: Type,
      where: { name: type } 
    }
  });

  if (pokemones.length === 0) {
    return [];
  }

  return pokemones.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    hp: pokemon.hp,
    attack: pokemon.attack,
    defense: pokemon.defense,
    speed: pokemon.speed,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((type) => type.name)
  }));
};

// const setInBD = async (pkmn) => {
   
//     const createdPokemon = await Pokemon.create({
//         name: pkmn.name,
//         image: pkmn.image ?? '',
//         hp: pkmn.hp ?? '',
//         attack: pkmn.attack ?? '',
//         defense: pkmn.defense ?? '',
//         speed: pkmn.speed ?? '',
//         height: pkmn.height ?? '',
//         weight: pkmn.weight ?? '',
//       });
    

//         const createdTypes = await Promise.allSettled(
//           pkmn.types.map(async (type) => {
//             return await Type.findOrCreate({
//               where: { name: type },
//               defaults: { name: type },
//             });
//           })
//         );
    
//         const resolvedTypes = createdTypes
//           .filter((result) => result.status === 'fulfilled')
//           .map((result) => result.value[0]);
    
//         await createdPokemon.setTypes(resolvedTypes);


// }

module.exports = {
    getPokemonByType
}