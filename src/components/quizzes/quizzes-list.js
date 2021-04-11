import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import CourseTable from "../course-table";

const QuizzesList = (props) => {
    const {courseId} = useParams()
    const [quizzes, setQuizzes] = useState([])
    useEffect(() => {
        fetch("http://localhost:4000/api/quizzes")
            .then(response => response.json())
            .then((quizzes) => {
                setQuizzes(quizzes)
            })
    }, [])
    return(
        <div class="quizTableRow">
            <div class="quizTableColumn">
                <h2>Courses</h2>
                <table className="table table-striped">
                    <tbody>
                    {
                        props.location.courses.map((course) => {
                            return(
                                <tr>
                                    <td>
                                        <Link to={"/courses/table/edit/" + course._id}>
                                            {course.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link className="float-right"
                                              to={{pathname: `/courses/${course._id}/quizzes`, courses: props.location.courses}}>
                                            Quizzes
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className="quizTableColumn">
            <h2>Quizzes ({quizzes.length})</h2>
            <table className="table table-striped">
                <tbody>
                {
                    quizzes.map((quiz) => {
                        return(
                            <tr>
                                <td>
                                    <Link to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                                        {quiz.title}
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default QuizzesList;