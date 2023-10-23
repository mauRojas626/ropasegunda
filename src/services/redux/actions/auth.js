import {
    LOGIN,
    LOGOUT,
} from './actionTypes/auth'

import { 
    validateBuyer as validateBuyerAPI,
} from '../../api/comprador-api'

import ResponseModel from '../../models/ResponseModel'

export const login = (userData) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await validateBuyerAPI(userData);
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: LOGIN,
                payload: res.response
            })
        } 
        return {
            type: LOGOUT
        }   
     
    } catch(e){ 
        console.log(e);
        console.log('ERROR! '+LOGIN);
        console.log(res.status);
        console.log(res.error);
    }
    
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

