import React, {useState} from "react";

const MultipleChoiceQuestion = ({question}) => {
    const [yourAnswer, setYourAnswer] = useState("")
    return(
        <div>
            <h3>
                {question.question}
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
                {
                    question.choices.map((choice) => {
                        return(
                            <li className={`list-group-item
                            ${(yourAnswer === question.correct && question.correct === choice) 
                                || (yourAnswer != "" && yourAnswer != question.correct && choice === question.correct)
                                ? 'list-group-item-success' : 
                                yourAnswer != "" && yourAnswer === choice ?
                                'list-group-item-danger' : 'list-group-item'}`}>
                                <label><input
                                    onClick={() => {
                                        setYourAnswer(choice)
                                    }}
                                    type="radio"
                                    name={question._id}/> {choice}</label>
                            </li>
                        )
                    })
                }
            </ul>
            <p>
                Your answer: {yourAnswer}
            </p>
            <button className="btn btn-success">Grade</button>
        </div>
    )
}

export default MultipleChoiceQuestion