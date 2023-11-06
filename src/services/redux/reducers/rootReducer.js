import { combineReducers } from 'redux'

import changeState from './changeState'
import comprador from './comprador'
import prenda from './prenda'
import auth from './auth'
import venta from './venta'
import provincia from './provincia'

const rootReducer = combineReducers({
    auth,
    changeState,
    comprador,
    prenda,
    venta,
    provincia
})

export default rootReducer