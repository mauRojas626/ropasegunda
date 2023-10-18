import {
    CREATE_BUYER,
    UPDATE_BUYER,
    GET_BUYERS,
    ERROR_BUYER
} from '../actions/actionTypes/comprador'

const initialState = {
    buyers: [],
    isLoading: true,
    failed: false
};

const buyer = (state = initialState, action) => {    
    switch(action.type){
        case GET_BUYERS:
            return {...state, buyers: action.playload, isLoading: false, failed: false};
        case CREATE_BUYER:
            return {...state, buyers: [...state.buyers, action.playload], failed: false};
        case UPDATE_BUYER:
            return {...state, buyers: state.buyers.map(buyer => buyer.id === action.playload.id ? {...buyer, nombre: action.playload.nombre, apellido: action.playload.apellido, correo: action.playload.correo, clave: action.playload.clave, telefono: action.playload.telefono, bloqueado: action.playload.bloqueado, reportado: action.playload.reportado, dni: action.playload.dni, genero: action.playload.genero, direccion: action.playload.direccion, idMedida: action.playload.idMedida, idProvincia: action.playload.idProvincia} : buyer), failed: false};
        case ERROR_BUYER:            
            return {...state, isLoading: false, failed: true};
        default:
            return {...state};
    }
}

export default buyer