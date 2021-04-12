import React, {useState} from "react";

const TrueFalseQuestion = ({question}) => {
    const [yourAnswer, setYourAnswer] = useState("")
    return(
        <div>
            <h3>{question.question}
                {
                    question.correct === yourAnswer &&
                    <i className="fas fa-check"></i>
                }
                {
                    question.correct !== yourAnswer && yourAnswer != "" &&
                    <i className="fas fa-times"></i>
                }
            </h3>
            <ul className="list-group">
                <li className={`list-group-item
                            ${(yourAnswer === question.correct && question.correct === "true")
                || (yourAnswer != "" && yourAnswer != question.correct && "true" === question.correct)
                    ? 'list-group-item-success' :
                    yourAnswer != "" && yourAnswer === "true" ?
                        'list-group-item-danger' : 'list-group-item'}`}>
                    <label><input
                        onClick={() => {
                            question.answer = "true"
                            setYourAnswer("true")
                        }}
                        type="radio"
                        name={question._id}/> True</label>
                </li>
                <li className={`list-group-item
                            ${(yourAnswer === question.correct && question.correct === "false")
                || (yourAnswer != "" && yourAnswer != question.correct && "false" === question.correct)
                    ? 'list-group-item-success' :
                    yourAnswer != "" && yourAnswer === "false" ?
                        'list-group-item-danger' : 'list-group-item'}`}>
                    <label><input
                        onClick={() => {
                            question.answer = "false"
                            setYourAnswer("false")
                        }}
                        type="radio"
                        name={question._id}/> False</label>
                </li>
            </ul>
            <p>
                Your answer: {yourAnswer}
            </p>
        </div>
    )
}

export default TrueFalseQuestion