  import {
      LOGIN,
      LOGOUT,
    } from '../actions/actionTypes/auth'
  
  import {
    UPDATE_QUESTION
  } from '../actions/actionTypes/consulta'

    const initialState = {
      isAuthenticated: false,
      user: null,
    }
    
    const auth = (state = initialState, action) => {
      switch (action.type) {
          case LOGIN:
              return {isAuthenticated: true, user: action.payload}
          case LOGOUT:
              return initialState
          case 'UPDATE_USER':
              return {...state, user: action.payload}
          case UPDATE_QUESTION:
              return {...state, user: {...state.user, idVendedor: {...state.user.idVendedor, consultas: state.user.idVendedor.consultas.filter(item => item.idConsulta !== action.payload.idConsulta)}}}
          default:
              return {...state}
      }
    }
    
    export default auth