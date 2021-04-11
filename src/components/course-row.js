import React, {useState} from 'react'
import {Link, Route} from "react-router-dom";
import CourseEditor from "./course-editor";

const CourseRow = (
    {
        deleteCourse,
        updateCourse,
        course,
        lastModified,
        title,
        owner,
        allCourses
    }) => {
    const[editing, setEditing] = useState(false)
    const[newTitle, setNewTitle] = useState(title)

    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }

    return (
        <tr>
            <td>
                {
                    !editing &&
                    <Link to={"/courses/table/edit/" + course._id}>
                        {title}
                    </Link>
                }
                {
                    editing &&
                    <input
                        onChange={(event) => setNewTitle(event.target.value)}
                        value={newTitle}
                        className="form-control"/>
                }
            </td>
            <td>{owner}</td>
            <td>{lastModified}</td>
            <td>
                <i onClick={() => deleteCourse(course)} className="fas fa-trash"></i>
                {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"></i>}
                {editing && <i onClick={() => saveTitle()} className="fas fa-check"></i>}
            </td>
            <td>
                <Link className="float-right"
                      to={{pathname: `/courses/${course._id}/quizzes`, courses: allCourses}}>
                    Quizzes
                </Link>
            </td>
        </tr>
    )
}
export default CourseRow