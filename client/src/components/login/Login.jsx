import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import validate from '../validate/validate'
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../redux/actions';



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
        if(!access) setErrorLogin('Verifique usuario y/o contraseña')
        
    }


    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="email">
                    E-Mail:
                    <input type="text" name="email" value={form.email} onChange={handleChange} />
                </label>
                {error.email && <span>{error.email}</span>}
                <label htmlFor="password">
                    Contraseña:
                    <input type="password" name="password" value={form.password} onChange={handleChange} />
                </label>
                {error.password && <span>{error.password}</span>}
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            <button onClick={handleGoBack}>Volver Atrás</button>
            {errorLogin && <span>{errorLogin}</span>}
        </div>
    );
}

export default Login;
