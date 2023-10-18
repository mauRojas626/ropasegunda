import {
    CREATE_CLOTHES,
    UPDATE_CLOTHES,
    GET_CLOTHES,
    ERROR_CLOTHES
} from '../actions/actionTypes/prenda'

const initialState = {
    clothes: [],
    isLoading: true,
    failed: false
};

const prenda = (state = initialState, action) => {    
    switch(action.type){
        case GET_CLOTHES:
            return {...state, clothes: action.playload, isLoading: false, failed: false};
        case CREATE_CLOTHES:
            return {...state, clothes: [...state.clothes, action.playload], failed: false};
        case UPDATE_CLOTHES:
            return {...state, clothes: state.clothes.map(item => item.id === action.playload.id ? {...item, nombre: action.playload.nombre, precio: action.playload.precio, talla: action.playload.talla, color: action.playload.color, detalle: action.playload.detalle, fechaPublicacion: action.playload.fechaPublicacion, idConsuta: action.playload.idConsuta, idMedida: action.playload.idMedida, idComprador: action.playload.idComprador, Comprado: action.playload.Comprado, descripcion: action.playload.descripcion} : item), failed: false};
        case ERROR_CLOTHES:            
            return {...state, isLoading: false, failed: true};
        default:
            return {...state};
    }
}

export default prenda