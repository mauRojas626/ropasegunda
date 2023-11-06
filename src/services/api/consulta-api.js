import { apiPost } from '../api/api'

const createQuestion = async (question) => {
    return await apiPost(`question/create`, question);
}

const updateQuestion = async (question) => {
    return await apiPost(`question/edit`, question);
}

export { createQuestion, updateQuestion } 