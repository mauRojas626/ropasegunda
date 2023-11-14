import {
    GET_CLOTHES,
    CREATE_CLOTHES,
    UPDATE_CLOTHES,
    ERROR_CLOTHES,
    DELETE_CLOTHES,
    BLOCK_CLOTHES
} from './actionTypes/prenda'
import { 
    createClothes as createClothesAPI,
    getClothes as getClothesAPI,
    updateClothes as updateClothesAPI,
    deleteClothes as deleteClothesAPI,
    blockClothes as blockClothesAPI,
    unBlockClothes as unblockClothesAPI
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

const deleteClothes = (id) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await deleteClothesAPI(id);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: DELETE_CLOTHES,
                playload: id
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+DELETE_CLOTHES);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_CLOTHES,
        playload: false
    })
}

const blockClothes = (id) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await blockClothesAPI(id);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            if(res.status === 200)
                return dispatch({
                    type: BLOCK_CLOTHES,
                    playload: id
                })
            else {
                return dispatch({
                    type: "ALREADY_BUY_CLOTHES",
                    playload: id
                })
            }
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+BLOCK_CLOTHES);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_CLOTHES,
        playload: false
    })
}

const unBlockClothes = (id) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await unblockClothesAPI(id);
        
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: "UNBLOCK_CLOTHES",
                playload: id
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+BLOCK_CLOTHES);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_CLOTHES,
        playload: false
    })

}

export { getClothes, createClothes, updateClothes, deleteClothes, blockClothes, unBlockClothes }