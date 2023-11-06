import {
    GET_CITIES,
    ERROR_CITIES
} from './actionTypes/provincia'
import { 
    getCities as getCitiesAPI
} from '../../api/provincia-api'

import ResponseModel from '../../models/ResponseModel'

const getCities = () => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await getCitiesAPI();
        
        if(!res.error && res.status >= 200 && res.status <= 300){

            return dispatch({
                type: GET_CITIES,
                playload: res.response 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_CITIES);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: ERROR_CITIES,
        playload: false
    })
}

export { getCities }