import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Landing from './components/landing/Landing'
import About from './components/about/about';
import Home from './components/home/Home';
import Login from './components/login/Login';
import CreateUser from './components/create/user/createUser'
import PokemonForm from '../src/components/create/pokemon/PokemonForm';
import { useSelector, useDispatch } from 'react-redux';
import validateToken from './components/validate/token'


function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const { access } = useSelector(state => state.login);
  
  // if (token) validateToken(token);
  useEffect(() => {
    if (token) {
      dispatch(validateToken(token));
    }
  }, [dispatch, token]);


  return (
    <div className="App">
        
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<CreateUser/>} />
        <Route path="/about" element={<About/>} />
        {access && <Route path="/create" element={<PokemonForm />} />}
      </Routes>
    </div>
  );
}

export default App;