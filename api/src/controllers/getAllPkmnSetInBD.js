const axios = require('axios')
const URL = 'https://pokeapi.co/api/v2/pokemon'
const { Pokemon, Type } = require('../db')


const getAllPkmnSetInBD = async (req, res) => {
    try {
      const { data } = await axios(`${URL}?limit=1400`)
      const totalPkmns = data.results.length
      for (let i = 0; i < totalPkmns; i++) {
        const { data } = await axios(`${URL}/${i + 1}`)
        const pokemon = {
          id: i + 1,
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default,
          hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
          attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type) => type.type.name),
        }
  
        const createdPokemon = await Pokemon.create({
          name: pokemon.name,
          image: pokemon.image ?? '',
          hp: pokemon.hp ?? '',
          attack: pokemon.attack ?? '',
          defense: pokemon.defense ?? '',
          speed: pokemon.speed ?? '',
          height: pokemon.height ?? '',
          weight: pokemon.weight ?? '',
        })
  
        const createdTypes = await Promise.allSettled(
          pokemon.types.map(async (type) => {
            return await Type.findOrCreate({
              where: { name: type },
              defaults: { name: type },
            })
          })
        )
        const resolvedTypes = createdTypes
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value[0])
  
        // Relaciona el pokemon creado con el tipo
        await createdPokemon.setTypes(resolvedTypes)
        console.log(createdPokemon)
      }
      return res.status(200).json({ message: 'Pokémon creados en la base de datos' })
    } catch (error) {
      console.error(error) // Agregado para mostrar el error en la consola
      return res.status(500).json({ error: 'Error al crear el Pokémon en la base de datos' })
    }

  }
  
  module.exports = {
    getAllPkmnSetInBD,
  }
  
  