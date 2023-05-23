import React, { useState } from 'react';
import axios from 'axios';
import styles from './PokemonForm.module.css'
import { useNavigate } from 'react-router-dom';

const PokemonForm = ( ) => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({ ...formData, types: [...formData.types, value] });
    } else {
      setFormData({
        ...formData,
        types: formData.types.filter((type) => type !== value),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/pokemon', formData);
      setFormData({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
      });
    } catch (error) {
      console.log('Error al crear el Pokémon:', error.response.data);
    }
  };

  
    const types = [
      'normal', 'fighting', 'fire', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
      'steel', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark',
      'fairy', 'unknown', 'shadow'
    ];

    const handleClose = (event) => {
      event.preventDefault();
      navigate(-1);
    } 


  return (
    <div>
      <button onClick={handleClose}>Cerrar</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />

        <label htmlFor="image">Imagen:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} />

        <label htmlFor="hp">Vida:</label>
        <input type="number" id="hp" name="hp" value={formData.hp} onChange={handleInputChange} />

        <label htmlFor="attack">Ataque:</label>
        <input type="number" id="attack" name="attack" value={formData.attack} onChange={handleInputChange} />

        <label htmlFor="defense">Defensa:</label>
        <input type="number" id="defense" name="defense" value={formData.defense} onChange={handleInputChange} />

        <label htmlFor="speed">Velocidad:</label>
        <input type="number" id="speed" name="speed" value={formData.speed} onChange={handleInputChange} />

        <label htmlFor="height">Altura:</label>
        <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} />

        <label htmlFor="weight">Peso:</label>
        <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />

        <label htmlFor="types">Tipos:</label>
        <div>
        {types.map((type) => (
          <div key={type}>
            <input
              type="checkbox"
              id={`type-${type}`}
              name="types"
              value={type}
              onChange={handleTypeChange}
            />
          <label htmlFor={`type-${type}`}>{type}</label>
          </div>
        ))}
      </div>


        <button type="submit">Crear Pokémon</button>
      </form>
    </div>
  );
};

export default PokemonForm;
