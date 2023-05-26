import axios from "axios";
import {
  LOGIN,
  GET_POKEMONS,
  SET_SEARCH_NAME,
  LOGOUT,
  SET_TYPE_FILTER,
  SET_SORT_ORDER,
  SET_FILTER_TYPE_NONE,
  SET_SEARCH_VALUE
} from "./action-types";


export const logout = () => {
  return async (dispatch) =>{
  dispatch({
    type: LOGOUT,
  });
 }
};

export const setLogin = (form) => {
  return async (dispatch) => {
    const endpoint = 'http://localhost:3001';

    try {
      const response = await axios.post(endpoint, form);
      const data = response.data;

      if (data.access === true) {
        dispatch({
          type: LOGIN,
          payload: data,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const getPokemonData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/pokemon');
      const data = response.data;
      await dispatch({ type: GET_POKEMONS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setTypeFilter = (type) => {
  return async (dispatch) => {
    try {
      if(type !== 'all'){
        const response = await axios.get(`http://localhost:3001/type/${type}`);
        const data = response.data
        await dispatch( {
          type: SET_TYPE_FILTER,
          payload: data,
        });
      }else{
        await dispatch({ type: SET_FILTER_TYPE_NONE })
      }
    
    } catch (error) {
      console.log(error);
    }
  }
};


export const setSortOrder = (sortOrder, list) => {
  return async (dispatch) => {
    let sortedList;
    switch (sortOrder) {
      case 'nameAsc':
        sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        sortedList = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'attackAsc':
        sortedList = [...list].sort((a, b) => a.attack - b.attack);
        break;
      case 'attackDesc':
        sortedList = [...list].sort((a, b) => b.attack - a.attack);
        break;
      case 'hpAsc':
        sortedList = [...list].sort((a, b) => b.hp - a.hp);
        break;
      case 'hpDesc':
        sortedList = [...list].sort((a, b) => a.hp - b.hp);
        break;
      default:
        sortedList = list;
        break;
    }
    await dispatch({
      type: SET_SORT_ORDER,
      payload: sortedList,
    });
  };
};

export const setSearchName = (searchName) => {
  return async (dispatch) =>{
  try {
    const response = await axios.get(
      `http://localhost:3001/pokemon?name=${searchName}`
    );
    console.log(response)
    const data = response.data;
    dispatch({
      type: SET_SEARCH_NAME,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
  }
}

export const setSearchValue = (searchName) =>{
  return async (dispatch) =>{
    dispatch({
      type: SET_SEARCH_VALUE,
      payload: searchName,
    });
  }

}
