import {
    CHANGE_STATE
} from './actionTypes/changeState'

const toggleSidebar = (value) => {
    return ({
        type: CHANGE_STATE,
        sidebarShow: value
    })
}

export { toggleSidebar }