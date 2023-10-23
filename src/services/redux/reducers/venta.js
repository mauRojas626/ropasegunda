import {
    CREATE_SELL,
    UPDATE_SELL,
    GET_SELL,
    ERROR_SELL,
    DELETE_SELL
} from '../actions/actionTypes/venta'

const initialState = {
    sell: [],
    isLoading: true,
    failed: false
};

const venta = (state = initialState, action) => {    
    switch(action.type){
        case GET_SELL:
            return {...state, sell: action.playload, isLoading: false, failed: false};
        case CREATE_SELL:
            return {...state, sell: [...state.sell, action.playload], failed: false};
        case UPDATE_SELL:
            return {...state, sell: state.sell.map(item => item.id === action.playload.id ? {...item, nombre: action.playload.nombre, precio: action.playload.precio, talla: action.playload.talla, color: action.playload.color, detalle: action.playload.detalle, fechaPublicacion: action.playload.fechaPublicacion, idConsuta: action.playload.idConsuta, idMedida: action.playload.idMedida, idComprador: action.playload.idComprador, Comprado: action.playload.Comprado, descripcion: action.playload.descripcion} : item), failed: false};
        case DELETE_SELL:
            return {...state, sell: state.sell.filter(item => item.id !== action.playload), failed: false};
        case ERROR_SELL:            
            return {...state, isLoading: false, failed: true};
        default:
            return {...state};
    }
}

export default venta