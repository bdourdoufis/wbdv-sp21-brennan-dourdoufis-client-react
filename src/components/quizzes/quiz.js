import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom"
import questionService, {findQuestionsForQuiz} from "../../services/questions-service";
import quizService, {submitQuiz, findAttemptsByQuizId} from "../../services/quizzes-service";
import Question from "./questions/question";

const Quiz = () => {
    const {quizId} = useParams()
    const [questions, setQuestions] = useState([])
    const [attempts, setAttempts] = useState([])
    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId).then((questions) => {
                setQuestions(questions)
        })
        quizService.findAttemptsByQuizId(quizId).then((attempts) => {
            setAttempts(attempts)
        })

    }, [])

    return(
        <div>
            <div className="quizTableRow">
                <div className="quizTableColumn">
                <h3>Quiz {quizId} ({questions.length})</h3>
                <ul>
                    {
                        questions.map((question) => {
                            return(
                                <li id={question._id}>
                                    <Question question={question}/>
                                </li>
                            )
                        })
                    }
                </ul>
                <button className="btn btn-success" onClick={() => {
                    quizService.submitQuiz(quizId, questions)
                    quizService.findAttemptsByQuizId(quizId).then((attempts) => {
                        setAttempts(attempts)
                    })
                }}>Submit</button>
                </div>
                <div className="quizTableColumn">
                    <h3>Previous Attempts</h3>
                    <table className="table table-striped">
                        <tbody>
                        {
                            attempts.map((attempt) => {
                                return(
                                    <tr>
                                        <td>
                                            Attempt
                                        </td>
                                        <td>
                                            <p className="float-right">
                                                Score: {attempt.score}
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Quiz;