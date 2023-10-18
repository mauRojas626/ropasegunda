import {
    GET_BUYERS,
    CREATE_BUYER,
    UPDATE_BUYER,
    ERROR_BUYER
} from './actionTypes/comprador'
import { 
    createBuyer as createBuyerAPI,
    getBuyers as getBuyersAPI,
    updateBuyer as updateBuyerAPI,
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

export { getBuyers, createBuyer, updateBuyer }