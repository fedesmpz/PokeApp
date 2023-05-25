const { Pokemon, Type } = require('../db');

const setPokemonInBd = async (req, res) => {
  const pokemon = req.body;

  try {
    const createdPokemon = await Pokemon.create({
      name: pokemon.name,
      image: pokemon.image ?? '',
      hp: pokemon.hp ?? '',
      attack: pokemon.attack ?? '',
      defense: pokemon.defense ?? '',
      speed: pokemon.speed ?? '',
      height: pokemon.height ?? '',
      weight: pokemon.weight ?? '',
    });

    const createdTypes = await Promise.allSettled(
      pokemon.types.map(async (type) => {
        return await Type.findOrCreate({
          where: { name: type },
          defaults: { name: type },
        });
      })
    );

    const resolvedTypes = createdTypes.filter((result) => result.status === 'fulfilled').map((result) => result.value[0]);


    //relaciono el pokemon creado con el tipo
    await createdPokemon.setTypes(resolvedTypes);

    const pkmn = await Pokemon.findByPk(createdPokemon.id, { include: Type });
    return res.status(200).json(pkmn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al crear el Pokémon en la base de datos' });
  }
};

module.exports = {
  setPokemonInBd,
};
