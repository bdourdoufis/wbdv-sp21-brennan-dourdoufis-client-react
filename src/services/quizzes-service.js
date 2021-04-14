import {} from 'dotenv/config'

const QUIZZES_URL = 'https://wbdv-bcd-sp21-server-node.herokuapp.com/api/quizzes';

const findAllQuizzes = () => {
    return fetch(QUIZZES_URL)
        .then(response => response.json())
}
const findQuizById = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}`)
        .then(response => response.json())
}
const submitQuiz = (quizId, questions) => {
    fetch(`${QUIZZES_URL}/${quizId}/attempts`, {
        method: 'POST',
        body: JSON.stringify(questions),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}
const findAttemptsByQuizId = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}/attempts`).then(response => response.json())
}
export default {
    findAllQuizzes, findQuizById, submitQuiz, findAttemptsByQuizId
}