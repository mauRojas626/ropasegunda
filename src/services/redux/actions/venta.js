import {
    GET_SELL,
    CREATE_SELL,
    UPDATE_SELL,
    ERROR_SELL,
    DELETE_SELL,
    VALIDATE_SELL,
    REQUEST_SHIPPING,
    PRICE_SHIPING,
    VALIDATE_SHIP,
    PAY_SHIP,
    ENVIAR,
    CALIFICAR
} from './actionTypes/venta'
import { 
    createSell as createSellAPI,
    getSell as getSellAPI,
    updateSell as updateSellAPI,
    deleteSell as deleteSellAPI,
    validateSell as validateSellAPI,
    requestShipping as requestShippingAPI,
    priceShiping as priceShipingAPI,
    validateShip as validateShipAPI,
    payShip as payShipAPI,
    enviar as enviarAPI,
    calificar as calificarAPI
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

const validateSell = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        
        res = await validateSellAPI(sell);

        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: VALIDATE_SELL,
                playload: sell 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+VALIDATE_SELL);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

const payShip = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
            
            res = await payShipAPI(sell);
    
            if(!res.error && res.status >= 200 && res.status <= 300){
                return dispatch({
                    type: PAY_SHIP,
                    playload: res.response
                })
            }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+PAY_SHIP);
        console.log(res.status);
        console.log(res.error);
    }
}

const validateShip = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
            
            res = await validateShipAPI(sell);
    
            if(!res.error && res.status >= 200 && res.status <= 300){
                return dispatch({
                    type: VALIDATE_SHIP,
                    playload: res.response
                })
            }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+VALIDATE_SHIP);
        console.log(res.status);
        console.log(res.error);
    }
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

const requestShipping = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await requestShippingAPI(sell);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: REQUEST_SHIPPING,
                playload: sell
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+REQUEST_SHIPPING);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

const priceShipping = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await priceShipingAPI(sell);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: PRICE_SHIPING,
                playload: sell
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+PRICE_SHIPING);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

const enviar = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await enviarAPI(sell);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: ENVIAR,
                playload: res.response
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+ENVIAR);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_SELL,
        playload: false
    })
}

const calificar = (sell) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await calificarAPI(sell);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: CALIFICAR,
                playload: sell
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+CALIFICAR);
        console.log(res.status);
        console.log(res.error);
    }
}

export { getSell, createSell, updateSell, deleteSell, validateSell, requestShipping, priceShipping, payShip, validateShip, enviar, calificar }