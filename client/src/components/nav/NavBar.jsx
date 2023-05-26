
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import {
  setTypeFilter,
  setSortOrder,
  setSearchName,
  setSearchValue,
  logout
} from '../../redux/actions';
import { useNavigate } from 'react-router-dom'
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
import types from '../validate/types'

const NavBar = () => {

  const pokemonData = useSelector((state) => state.pokemonData);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleTypeFilterChange = async (event) => { 
    const type = event.target.value;
    await dispatch(setTypeFilter(type));
  };

  const handleSortOrderChange = (event) => { 
    dispatch(setSortOrder(event.target.value, pokemonData));
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchName = event.target.elements.search.value;
    dispatch(setSearchValue(searchName));
    dispatch(setSearchName(searchName));
    event.target.elements.search.value = ''
  };

  const handleLogout = () => {  
    navigate('/')
    dispatch(logout());
  };


  return (
      <div>
          <div className={styles.header}>
              <div className={styles.title}></div>
              <div className={styles.buttonContainer}>
                <Link to="/create">
                  <button className={styles.createBtn}><p className={styles.texto}>Crear Pokemon</p></button>
                </Link>
                <Link to="/about">
                  <button className={styles.otherBtn}><p className={styles.otherBtnText}>About</p></button>
                </Link>
                <button className={styles.otherBtn} onClick={handleLogout}><p className={styles.otherBtnText}>Cerrar Sesión</p></button>
              </div>
          </div>

          <div className={styles.searchBarContainer}>
              <div className={styles.searchContainer}>
                <div className={styles.searchText}>
                  <p>Buscar</p>
                </div>
                <form onSubmit={handleSearch} className={styles.searchInput}>
                  <input type="text" name="search" className={styles.dataInput} placeholder='Ej: Pikachu'/>
                  <button className={styles.searchBtn} type="submit">🔎</button>
                </form>
              </div>
              <div className={styles.container}>
              <div className={styles.searchContainer}>
                <div>
                    <p className={styles.searchText}>Ver</p>
                </div>
                <select className={styles.selectContainer} onChange={handleTypeFilterChange}>
                <option value="all">Todos los Tipos</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                  ))}
                </select>
              </div>
              
              <div className={styles.searchContainer}>  
              <div>
                    <p className={styles.filterText}>Ordenar por</p>
                </div> 
                <select onChange={handleSortOrderChange} className={styles.selectContainer}>
                  <option value="nameAsc">Nombre (Ascendente)</option>
                  <option value="nameDesc">Nombre (Descendente)</option>
                  <option value="attackAsc">Ataque (Ascendente)</option>
                  <option value="attackDesc">Ataque (Descendente)</option>
                  <option value="hpDesc">Vida (Ascendente)</option>
                  <option value="hpAsc">Vida (Descendente)</option>
                </select>
              </div>
              </div>
          </div>

      </div>
  );
};

export default NavBar;

