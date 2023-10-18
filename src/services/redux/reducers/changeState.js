import {
    CHANGE_STATE
  } from '../actions/actionTypes/changeState'
  
  const initialState = {
    sidebarShow: 'responsive'
  }
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      case CHANGE_STATE:
        return {...state, ...rest }
      default:
        return {...state}
    }
  }
  
  export default changeState