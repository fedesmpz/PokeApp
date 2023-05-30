import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css'


const Landing = () => {
  return (
    <div className={styles.image}>
      <div className={styles.box}>
        <div className={styles.title}></div>



      <Link to="/login">
        <button className={styles.button1}><p className={styles.text1}>Inicia sesión</p></button>
      </Link>
      <Link to="/register">
        <button className={styles.button2}><p className={styles.text2}>Registrate</p></button>
      </Link>
      <Link to="/home">
        <button className={styles.button3}><p className={styles.text3}>Iniciar como invitado</p></button>
      </Link>
      </div>
    </div>
  );
}

export default Landing;
