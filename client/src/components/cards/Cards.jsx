import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import Detail from '../detail/Detail';
import styles from './Cards.module.css'
import { useSelector } from 'react-redux';
import {
  setSearchValue
} from '../../redux/actions';

const Cards = ({ data }) => {
  
  const cardsPerPage = 12;
  const searchName = useSelector((state) => state.searchName);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(data.length / cardsPerPage);

  useEffect(() => {  
      setCurrentPage(1)
      setSearchValue('')
  }, [searchName]);


  const goToPage = (page) => {
    setCurrentPage(page);
  };

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

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


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
        <div>
          <div className={styles.cardContainer}>
            {currentCards.map((pokemon) => (
              <Card key={pokemon.id} pkmn={pokemon} onClick={handleCardClick} />
            ))}
          </div>
          <div className={styles.paginationCenter}>
            <div className={styles.pagination}>
              <div className={styles.pagination}>
                <button className={styles.primary} onClick={prevPage} disabled={currentPage === 1}>
                  Anterior
                </button>
                {/* <div className={styles.pageContainer}>
                </div> */}
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
