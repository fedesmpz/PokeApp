import {
    LOGIN,
    GET_POKEMONS,
    SET_TYPE_FILTER,
    SET_SORT_ORDER,
    LOGOUT,
    SET_SEARCH_NAME,
    SET_FILTER_TYPE_NONE,
    SET_SEARCH_VALUE
  } from "./action-types";
  
  const initialState = {
    pokemonData: [],
    dataLoaded: false,
    pokemonDetail: {},
    login: { access: false },
    tempData: [],
    searchName: '',
  };
  
  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOGIN:
        return {
          ...state,
          login: payload,
        };
  
      case GET_POKEMONS:
        return {
          ...state,
          pokemonData: payload,
          tempData: payload,
          dataLoaded: true,
        };

      case SET_TYPE_FILTER:
        return {
          ...state,
          pokemonData: payload,
        };
        
      case SET_SORT_ORDER:
          return {
            ...state,
            pokemonData: payload,
          };
    
      case SET_SEARCH_NAME:
        return {
          ...state,
          pokemonData: payload,
        };

      case SET_SEARCH_VALUE:
        return {
          ...state,
          searchName: payload,
        };

      case SET_FILTER_TYPE_NONE:
        return {
          ...state,
          pokemonData: state.tempData
        }
  
      case LOGOUT:
        return {
          ...state,
          login: { access: false },
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  