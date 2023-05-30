import React, { useState } from 'react';
import axios from 'axios';
import styles from './PokemonForm.module.css';
import { useNavigate } from 'react-router-dom';
import types from '../../validate/types'

const PokemonForm = () => {

  const navigate = useNavigate();
  
  const [success, setSuccess] = useState('')
  const [typeSelection, setTypeSelection] = useState([]);
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

  const handleTypeClick = (type) => {
    const updatedSelection = typeSelection.includes(type)
      ? typeSelection.filter((selectedType) => selectedType !== type)
      : [...typeSelection, type];
    setTypeSelection(updatedSelection);
  };

  const clearSuccess = () =>{
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    valid()
    try {
      const response = await axios.post('http://localhost:3001/pokemon', {
        ...formData,
        types: typeSelection,
      });
      setSuccess('Pokemon creado exitosamente');
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
      setSuccess(`Error al crear el Pokémon`)
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const valid = () =>{
    if (formData.name.length < 1 || 
        formData.image.length < 1 ||
        formData.types.length < 1) {
          setSuccess('Hay errores en el formulario')
        }
  }
 
  return (
    <div className={styles.image}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div onClick={handleClose} className={styles.btn}></div>
          <h1 className={styles.titleText}>Crea tu Pokemon</h1>
        </div>
          <form>
            <div className={styles.fileAlign}>
                <div className={styles.celAlign}>
                  <label htmlFor="name" className={`${styles.formLabel} ${styles.alignLeft}`}>Nombre:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={styles.formInput}/>
                </div>
                <div className={styles.celAlign}>
                  <label htmlFor="height" className={`${styles.formLabel} ${styles.alignLeft}`}>Altura:</label>
                  <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} className={styles.formInput}/>
                </div>
                <div className={styles.celAlign}>
                  <label htmlFor="weight" className={`${styles.formLabel} ${styles.alignLeft}`}>Peso:</label>
                  <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} className={styles.formInput} />
                </div>
            </div>
            <div className={styles.fileAlign}>
                <div className={styles.celAlign}>          
                  <label htmlFor="hp" className={`${styles.formLabel} ${styles.alignLeft}`}>Vida:</label>
                  <input type="number" id="hp" name="hp" value={formData.hp} onChange={handleInputChange} className={styles.formInput} />
                </div>
                <div className={styles.celAlign}>
                  <label htmlFor="attack" className={`${styles.formLabel} ${styles.alignLeft}`}>Ataque:</label>
                  <input type="number" id="attack" name="attack" value={formData.attack} onChange={handleInputChange} className={styles.formInput} />
                </div>
                <div className={styles.celAlign}>    
                  <label htmlFor="defense" className={`${styles.formLabel} ${styles.alignLeft}`}>Defensa:</label>
                  <input type="number" id="defense" name="defense" value={formData.defense} onChange={handleInputChange} className={styles.formInput} />
                </div>
            </div>
            <div className={styles.fileAlign}>
                <div className={styles.celAlign}>
                  <label htmlFor="speed" className={`${styles.formLabel} ${styles.alignLeft}`}>Velocidad:</label>
                  <input type="number" id="speed" name="speed" value={formData.speed} onChange={handleInputChange} className={styles.formInput} />
                </div>
                <div className={styles.celAlign}>
                  <label htmlFor="image" className={`${styles.formLabel} ${styles.alignLeft}`}>Imagen:</label>
                  <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} className={styles.formInput} />
                </div>
            </div>
            <div className={styles.typeBtnContainer}>
              <label htmlFor="types" className={`${styles.formLabel} ${styles.alignType}`}>Tipos:</label>
              <div className={styles.typeContainer}>
                {types.map((type) => (
                  <button
                    key={type}
                    className={`${styles.toggleButton} ${typeSelection.includes(type) ? styles[type] : ''}`}
                    onClick={() => handleTypeClick(type)}type="button">
                    {type}
                  </button>
                ))}
              </div>  
            </div>
            <button className={styles.formButton} onClick={handleSubmit} type="button">
              Crear Pokémon
            </button>
        </form>
        {success && (
          <div className={styles.errorScreen}>
            <div>
              <p>{success}</p>
            </div>
            <div>
              <button className={styles.formButton} onClick={clearSuccess}>VOLVER</button>
            </div>
          </div>
        )}
      </div> 
    </div>
  );
};

export default PokemonForm;
