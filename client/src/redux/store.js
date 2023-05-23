import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

//configuracion para conectar el proyecto de redux con cualquier navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))) //sirve para que podamos hacer peticiones a una API/servidor


export default store;