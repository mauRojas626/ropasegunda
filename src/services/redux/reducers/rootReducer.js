import { combineReducers } from 'redux'

import changeState from './changeState'
import comprador from './comprador'
import prenda from './prenda'
import auth from './auth'
import venta from './venta'


const rootReducer = combineReducers({
    auth,
    changeState,
    comprador,
    prenda,
    venta
})

export default rootReducer