import {
    CREATE_SELL,
    UPDATE_SELL,
    GET_SELL,
    ERROR_SELL,
    DELETE_SELL,
    VALIDATE_SELL,
    REQUEST_SHIPPING,
    PRICE_SHIPING,
    VALIDATE_SHIP,
    PAY_SHIP,
    ENVIAR,
    CALIFICAR,
    GET_QUEJAS,
    RESOLVER_QUEJA
} from '../actions/actionTypes/venta'

const initialState = {
    sell: [],
    quejas: [],
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
        case VALIDATE_SELL:
            return {...state, sell: state.sell.map(item => item.id === action.playload.id ? {...item, estado: 1, comprobantePago: action.payload.comprobantePago} : item), failed: false};
        case REQUEST_SHIPPING:
            return {...state, sell: state.sell.map(item => item.id === action.playload.id ? {...item, estado: 2} : item), failed: false};
        case PAY_SHIP:
            return {...state, sell: state.sell.map(item => item.idEnvio === action.playload.idEnvio ? {...item, estado: 4, idEnvio: action.playload} : item), failed: false};
        case PRICE_SHIPING:
            return {...state, sell: state.sell.map(item => item.idEnvio.idEnvio === action.playload.idEnvio ? {...item, estado: 3, idEnvio: action.playload} : item), failed: false};
        case VALIDATE_SHIP:
            return {...state, sell: state.sell.map(item => item.idEnvio.idEnvio === action.playload.idEnvio ? {...item, estado: 5, idEnvio: action.playload} : item), failed: false};
        case ENVIAR:
            return {...state, sell: state.sell.map(item => item.idEnvio.idEnvio === action.playload.idEnvio ? {...item, estado: 6, idEnvio: action.playload} : item), failed: false};
        case CALIFICAR:
            return {...state, sell: state.sell.map(item => item.idEnvio.idEnvio === action.playload.idEnvio ? {...item, estado: 7} : item), failed: false};
        case GET_QUEJAS:
            return {...state, quejas: action.playload, isLoading: false, failed: false};
        case RESOLVER_QUEJA:
            return {...state, quejas: state.quejas.filter(item => item.id !== action.playload), failed: false};
        case ERROR_SELL:            
            return {...state, isLoading: false, failed: true};
        default:
            return {...state};
    }
}

export default venta