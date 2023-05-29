import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import validate from '../validate/validate'
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../redux/actions';
import styles from './Login.module.css'



const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const access = useSelector((state) => state.login.access);

    const [form, setForm] = useState({
        email:'',
        password:''
    })
    const [errorLogin, setErrorLogin] = useState('');
    const [error, setError] = useState({})

    const handleChange = (event) =>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
        setError(validate(form.email, form.password))
    }

    const handleGoBack = (event) => {
        event.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        if (access) {
          navigate('/home');
        }
      }, [access, navigate]);

    const handleSubmit = async (event) =>{
        event.preventDefault()
        await dispatch(setLogin(form))
        if(!access) setErrorLogin('Verifica tu usuario o contraseña')
        
    }

    const clearSuccess = () =>{
        setErrorLogin('')
      }


    return (
       
        <div className={styles.image}>
        <div className={styles.container}>
          <div className={styles.title}>
            <div onClick={handleGoBack} className={styles.btn}></div>
            <h1 className={styles.titleText}>Inicia Sesión</h1>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.formButton}>INGRESA</button>
          </form>
          {errorLogin && (
          <div className={styles.errorScreen}>
          <div>
            <p>{errorLogin}</p>
          </div>
          <div>
            <button className={styles.formButton} onClick={clearSuccess}>VOLVER</button>
          </div>
        </div>
          )}
          
        </div>
      </div>
    );
}

export default Login;
