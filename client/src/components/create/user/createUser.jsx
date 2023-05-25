import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validate from '../../validate/validate';
import styles from './createUser.module.css'

const CreateUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (event) =>{
    setForm({
        ...form,
        [event.target.name]:event.target.value
    })
    setError(validate(form.email, form.password))
  };

  const clearSuccess = () =>{
    setSuccess('')
  }

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(form.name.length < 1 || form.surname.length < 1){
      setSuccess('Faltan completar campos')
    }
    if(error){
      setSuccess('Hay errores en el registro')
    }

    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/register', form);
        setSuccess('Usuario creado exitosamente');
        setForm({
          name: '',
          surname: '',
          email: '',
          password: '',
        });
        // return response
      } catch (error) {
        setSuccess('Error al crear el usuario'+ error.message);
        // return error
      }
    }
  };

  return (
    <div className={styles.image}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div onClick={handleGoBack} className={styles.btn}></div>
          <h1 className={styles.titleText}>Registrate</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={`${styles.formLabel} ${styles.alignLeft}`}>
              Nombre
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={styles.formInput}
                placeholder='Ej: Ash'
              />
            </label>
          </div>
          <div>
            <label htmlFor="surname" className={`${styles.formLabel} ${styles.alignLeft}`}>
              Apellido
              <input
                type="text"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                className={styles.formInput}
                placeholder='Ej: Ketchum'
              />
            </label>
          </div>
          <div>
            <label htmlFor="email" className={`${styles.formLabel} ${styles.alignLeft}`}>
              E-Mail
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder='Ej: ashketchum@pokemon.com'
              />
            </label>
            <div>
              {error.email && <span>{error.email}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className={`${styles.formLabel} ${styles.alignLeft}`}>
              Contraseña
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={styles.formInput}
                placeholder='Contraseña'
              />
            </label>
            <div>
              {error.password && <span>{error.password}</span>}
            </div>
          </div>
          <button type="submit" className={styles.formButton}>REGISTRARME</button>
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

export default CreateUser;


