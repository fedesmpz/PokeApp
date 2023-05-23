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

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      } catch (error) {
        setSuccess('Error al crear el usuario');
      }
    }
  };


  return (
    <div>
      <div className={styles.container}>
  <h1>Crear Nuevo Usuario</h1>
  <form>
  <label htmlFor="firstName">
          Primer Nombre
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <label htmlFor="lastName">
          Apellido:
          <input type="text" name="surname" value={form.surname} onChange={handleChange}/>
        </label>
        <label htmlFor="email">
          E-Mail:
          <input type="text" name="email" value={form.email} onChange={handleChange} />
        </label>
        {error.email && <span>{error.email}</span>}
        <label htmlFor="password">
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </label>
        {error.password && <span>{error.password}</span>}
        <button type="submit" onClick={handleSubmit}>Crear Usuario</button>
  </form>
  <button onClick={handleGoBack}>Atras</button>
  {success && <span>{success}</span>}
</div>

    </div>
  );
};

export default CreateUser;


