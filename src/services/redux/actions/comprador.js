import {
    GET_BUYERS,
    CREATE_BUYER,
    UPDATE_BUYER,
    ERROR_BUYER,
    VALIDATE_RUC,
    REPORT_USER,
    BLOCK_USER
} from './actionTypes/comprador'
import { 
    createBuyer as createBuyerAPI,
    getBuyers as getBuyersAPI,
    updateBuyer as updateBuyerAPI,
    validateRuc as validateRucAPI,
    reportUser as reportUserAPI,
    blockUser as blockUserAPI
} from '../../api/comprador-api'

import ResponseModel from '../../models/ResponseModel'

const getBuyers = () => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await getBuyersAPI();
        
        if(!res.error && res.status >= 200 && res.status <= 300){

            return dispatch({
                type: GET_BUYERS,
                playload: res.response 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_BUYERS);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_BUYER,
        playload: false
    })
}

const createBuyer = (buyer) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        
        res = await createBuyerAPI(buyer);
        buyer.id = res.response;
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: CREATE_BUYER,
                playload: buyer 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+CREATE_BUYER);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_BUYER,
        playload: false
    })
}

const updateBuyer = (buyer) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await updateBuyerAPI(buyer);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: UPDATE_BUYER,
                playload: buyer 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+UPDATE_BUYER);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_BUYER,
        playload: false
    })
}

const validateRuc = (buyer) => async (dispatch) => {
    let res = new ResponseModel();
    try {
        res = await validateRucAPI(buyer);
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: VALIDATE_RUC,
                payload: buyer.idVendedor
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+VALIDATE_RUC);
        console.log(res.status);
        console.log(res.error);
    }
}

const reportUser = (user) => async (dispatch) => {
    let res = new ResponseModel();
    try {
        res = await reportUserAPI(user);
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: REPORT_USER,
                payload: user.idVendedor
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+REPORT_USER);
        console.log(res.status);
        console.log(res.error);
    }
}

const blockUser = (user) => async (dispatch) => {
    let res = new ResponseModel();
    try {
        res = await blockUserAPI(user);
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: BLOCK_USER,
                payload: user.idVendedor
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+BLOCK_USER);
        console.log(res.status);
        console.log(res.error);
    }
}

export { getBuyers, createBuyer, updateBuyer, validateRuc, reportUser, blockUser }