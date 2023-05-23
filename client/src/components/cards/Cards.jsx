import React, { useState } from 'react';
import Card from '../card/Card';
import Detail from '../detail/Detail';
import styles from './Cards.module.css'

const Cards = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Calcular el índice inicial y final de las tarjetas para la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(data.length / cardsPerPage);

  // Función para cambiar a la página seleccionada
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Generar los números de página como elementos de botón
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => goToPage(i)}
        className={currentPage === i ? styles.active : ''}
      >
        {i}
      </button>
    );
  }

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackClick = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className={styles.image}>
      {selectedPokemon ? (
        <Detail pokemon={selectedPokemon} onBackClick={handleBackClick} />
      ) : (
        <div className={styles.cardContainer}>
          {currentCards.map((pokemon) => (
            <Card key={pokemon.id} pkmn={pokemon} onClick={handleCardClick} />
          ))}
          <div className={styles.paginationCenter}>
            <div className={styles.pagination}>
              <div className={styles.pagination}>
                <button className={styles.primary} onClick={prevPage} disabled={currentPage === 1}>
                  Anterior
                </button>
              <div className={styles.pageNumbers}>{pageNumbers}</div>
                <button className={styles.primary} onClick={nextPage} disabled={currentPage === totalPages}>
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Cards;
