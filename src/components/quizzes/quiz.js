import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import questionService, {findQuestionsForQuiz} from "../../services/questions-service";
import Question from "./questions/question";

const Quiz = () => {
    const {quizId} = useParams()
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId).then((questions) => {
                setQuestions(questions)
            })
    }, [])

    return(
        <div>
            <h3>Quiz {quizId} ({questions.length})</h3>
            <ul>
                {
                    questions.map((question) => {
                        return(
                            <li>
                                <Question question={question}/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Quiz;