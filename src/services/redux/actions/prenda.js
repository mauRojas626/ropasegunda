import {
    GET_CLOTHES,
    CREATE_CLOTHES,
    UPDATE_CLOTHES,
    ERROR_CLOTHES
} from './actionTypes/prenda'
import { 
    createClothes as createClothesAPI,
    getClothes as getClothesAPI,
    updateClothes as updateClothesAPI,
} from '../../api/prenda-api'

import ResponseModel from '../../models/ResponseModel'

const getClothes = () => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await getClothesAPI();
        
        if(!res.error && res.status >= 200 && res.status <= 300){

            return dispatch({
                type: GET_CLOTHES,
                playload: res.response 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_CLOTHES);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_CLOTHES,
        playload: false
    })
}

const createClothes = (clothes) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        
        res = await createClothesAPI(clothes);
        clothes.id = res.response;

        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: CREATE_CLOTHES,
                playload: clothes 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+CREATE_CLOTHES);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_CLOTHES,
        playload: false
    })
}

const updateClothes = (clothes) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await updateClothesAPI(clothes);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: UPDATE_CLOTHES,
                playload: clothes
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+UPDATE_CLOTHES);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_CLOTHES,
        playload: false
    })
}

export { getClothes, createClothes, updateClothes }