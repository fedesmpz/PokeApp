
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import {
  setTypeFilter,
  setSortOrder,
  setSearchName,
  logout
} from '../../redux/actions';
import { useNavigate } from 'react-router-dom'
import PokemonForm from '../create/pokemon/PokemonForm';

const NavBar = () => {

  const pokemonData = useSelector((state) => state.pokemonData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);


  const handleTypeFilterChange = async (event) => {  //funcional
    const type = event.target.value;
    await dispatch(setTypeFilter(type));
  };

  const handleSortOrderChange = (event) => { //funcional
    dispatch(setSortOrder(event.target.value, pokemonData));
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchName = event.target.elements.search.value;
    dispatch(setSearchName(searchName));
  };

  const handleLogout = () => {  
    navigate('/')
    dispatch(logout());
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const types = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
    'steel', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark',
    'fairy', 'unknown', 'shadow'
  ];


  return (
    <div>
              {showForm ? (
        <PokemonForm handleClose={handleCloseForm}/>
      ) : (
        <>
      <select onChange={handleTypeFilterChange}>
        <option value="all">Todos los Tipos</option>
          {types.map((type) => (
          <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
        ))}
      </select>

      <select onChange={handleSortOrderChange}>
        <option value="nameAsc">Nombre (Ascendente)</option>
        <option value="nameDesc">Nombre (Descendente)</option>
        <option value="attackAsc">Ataque (Ascendente)</option>
        <option value="attackDesc">Ataque (Descendente)</option>
      </select>

      <form onSubmit={handleSearch}>
        <input type="text" name="search" />
        <button type="submit">Buscar</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleShowForm}>Agregar Pokémon</button>
      </>
      )}
    </div>
  );
};

export default NavBar;

