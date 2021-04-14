import {} from 'dotenv/config'

const QUIZZES_URL = 'https://wbdv-bcd-sp21-server-node.herokuapp.com/api/quizzes';


const findQuestionsForQuiz = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}/questions`)
        .then(response => response.json())
}
export default {
    findQuestionsForQuiz
}
