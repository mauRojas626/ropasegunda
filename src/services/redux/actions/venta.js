import {
    GET_SELL,
    CREATE_SELL,
    UPDATE_SELL,
    ERROR_SELL,
    DELETE_SELL
} from './actionTypes/venta'
import { 
    createSell as createSellAPI,
    getSell as getSellAPI,
    updateSell as updateSellAPI,
    deleteSell as deleteSellAPI
} from '../../api/venta-api'

import ResponseModel from '../../models/ResponseModel'

const getSell = (id) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await getSellAPI(id);
        
        if(!res.error && res.status >= 200 && res.status <= 300){

            return dispatch({
                type: GET_SELL,
                playload: res.response 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_SELL);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

const createSell = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        
        res = await createSellAPI(sell);
        sell.id = res.response;

        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: CREATE_SELL,
                playload: sell 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+CREATE_SELL);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

const updateSell = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await updateSellAPI(sell);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: UPDATE_SELL,
                playload: sell
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+UPDATE_SELL);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

const deleteSell = (id) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await deleteSellAPI(id);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: DELETE_SELL,
                playload: id
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+DELETE_SELL);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

export { getSell, createSell, updateSell, deleteSell }