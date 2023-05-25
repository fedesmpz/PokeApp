import React from 'react';
import styles from './Card.module.css';

const Card = ({ pkmn, onClick }) => {
  const handleDetailClick = () => {
    onClick(pkmn);
  };

  return (
    <div className={styles.card}>
      <img src={pkmn?.image} alt="" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.name}>{pkmn?.name}</h2>
        <div className={styles.typeContainer}>
          <p className={styles.typeTitle}>Tipo:</p>
          <div className={styles.types}>
            {pkmn?.types?.map((type, index) => (
              <span key={index} className={`${styles.type} ${styles[type.toLowerCase()]}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
        <br />
        <button onClick={handleDetailClick} className={styles.detailBtn}>
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default Card;





