import React from 'react';
import styles from './Detail.module.css'

const Detail = ({pokemon, onBackClick }) => {
    return (
        <div className={styles.image}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div onClick={onBackClick} className={styles.btn}></div>
                    <h2 className={styles.titleCard}>{pokemon.name}</h2>
                </div>
                    <div className={styles.pkmnContainer}>
                        <div className={styles.imgContainer}>
                            <img src={pokemon?.image} alt="" />
                        </div>
                        <div className={styles.dataContainer}>
                            <div className={styles.typeContainer}>
                                <p className={styles.typeTitle}>Tipos</p>
                                <div className={styles.types}>
                                    {pokemon?.types?.map((type, index) => (
                                        <span key={index} className={`${styles.type} ${styles[type.toLowerCase()]}`}>
                                        {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className={styles.typeTitle}>Vida</p>
                                <p className={styles.dataPkm}>{pokemon?.hp}</p>

                            </div>
                            <div>
                                <p className={styles.typeTitle}>Ataque</p>
                                <p className={styles.dataPkm}>{pokemon?.attack}</p>
                                    
                            </div>
                            <div>
                                <p className={styles.typeTitle}>Defensa</p>
                                <p className={styles.dataPkm}>{pokemon?.defense}</p>
                                    
                            </div>
                            <div>
                                <p className={styles.typeTitle}>Velocidad</p>
                                <p className={styles.dataPkm}>{pokemon?.speed}</p>
                                    
                            </div>
                            <div>
                                <p className={styles.typeTitle}>Altura</p>
                                <p className={styles.dataPkm}>{pokemon?.height}</p>
                                    
                            </div>
                            <div>
                                <p className={styles.typeTitle}>Peso</p>
                                <p className={styles.dataPkm}>{pokemon?.weight}</p>
                                    
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Detail;
