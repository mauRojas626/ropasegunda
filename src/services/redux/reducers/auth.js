  import {
      LOGIN,
      LOGOUT,
    } from '../actions/actionTypes/auth'
    
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
          default:
              return {...state}
      }
    }
    
    export default auth