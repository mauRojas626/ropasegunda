import { combineReducers } from 'redux'

import changeState from './changeState'
import comprador from './comprador'
import prenda from './prenda'

const rootReducer = combineReducers({
    changeState,
    comprador,
    prenda
})

export default rootReducer