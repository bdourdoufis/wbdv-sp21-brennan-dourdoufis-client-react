import {} from 'dotenv/config'

const QUIZZES_URL = 'http://wbdv-bcd-sp21-server-node.herokuapp.com/api/quizzes'; //'http://localhost:4000/api/quizzes';


const findQuestionsForQuiz = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}/questions`)
        .then(response => response.json())
}
export default {
    findQuestionsForQuiz
}
