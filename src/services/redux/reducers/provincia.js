import {
    GET_CITIES,
    ERROR_CITIES
} from '../actions/actionTypes/provincia'

const initialState = {
    cities: [],
    isLoading: true,
    failed: false
};

const provincia = (state = initialState, action) => {    
    switch(action.type){
        case GET_CITIES:
            return {...state, cities: action.playload, isLoading: false, failed: false};
        case ERROR_CITIES:            
            return {...state, isLoading: false, failed: true};
        default:
            return {...state};
    }
}

export default provincia