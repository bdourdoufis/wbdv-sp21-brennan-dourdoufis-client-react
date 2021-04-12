const QUIZZES_URL = process.env.QUIZ_SERVICE_URI || 'http://localhost:4000/api/quizzes';
const findQuestionsForQuiz = (qid) => {
    return fetch(`${QUIZZES_URL}/${qid}/questions`)
        .then(response => response.json())
}
export default {
    findQuestionsForQuiz
}
