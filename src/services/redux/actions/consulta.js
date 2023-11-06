import {
    UPDATE_QUESTION,
    CREATE_QUESTION
} from '../actions/actionTypes/consulta'

import {
    createQuestion as createQuestionAPI,
    updateQuestion as updateQuestionAPI
} from '../../api/consulta-api'

import ResponseModel from '../../models/ResponseModel'

const createQuestion = (question) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        
        res = await createQuestionAPI(question);
        question.id = res.response;
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: CREATE_QUESTION,
                payload: question 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+CREATE_QUESTION);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: CREATE_QUESTION,
        payload: false
    })
}

const updateQuestion = (question) => async (dispatch) => {
    let res = new ResponseModel();
    try{
        res = await updateQuestionAPI(question);
        if(!res.error && res.status >= 200 && res.status <= 300){
            return dispatch({
                type: UPDATE_QUESTION,
                payload: question 
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+UPDATE_QUESTION);
        console.log(res.status);
        console.log(res.error);
    }
    return dispatch({
        type: UPDATE_QUESTION,
        payload: false
    })
}

export { createQuestion, updateQuestion }