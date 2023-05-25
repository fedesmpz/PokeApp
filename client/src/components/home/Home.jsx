import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../cards/Cards';
import { getPokemonData } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import NavBar from '../nav/NavBar';
import styles from './Home.module.css'

const Home = () => {
  const pokemonData = useSelector((state) => state.pokemonData);
  const dataLoaded = useSelector((state) => state.dataLoaded);
  const access = useSelector((state => state.login.access))
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(getPokemonData());
    }
  }, []);
  

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate('/');
  };


  return (
    <div className={styles.image}>
      {access ? <NavBar /> : (
      <div className={styles.header}>
        <div className={styles.title}></div>
        <button className={styles.loginBtn} onClick={handleGoBack}><p className={styles.texto}>Ir al inicio</p></button>
      </div>
    )}
      <div>

      {dataLoaded ? (
        
        <Cards data={pokemonData} />
        ) : (
          <div className={styles.loadingScreen}>
            <p>Cargando...</p>
          </div>
          )}
          </div>
    </div>
  );
};

export default Home;
