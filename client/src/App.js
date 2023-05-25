import './App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from './components/landing/Landing'
import About from './components/about/about';
import Home from './components/home/Home';
import Login from './components/login/Login';
import CreateUser from './components/create/user/createUser'
import PokemonForm from '../src/components/create/pokemon/PokemonForm';
import { useSelector } from 'react-redux';


function App() {

  const { access } = useSelector(state => state.login);

  return (
    <div className="App">
        
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<CreateUser/>} />
        <Route path="/about" element={<About/>} />
        {/* <Route path="/create" element={<PokemonForm/>} /> */}
        {access && <Route path="/create" element={<PokemonForm />} />}
      </Routes>
    </div>
  );
}

export default App;