import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";

const CourseCard = (
    {
        deleteCourse,
        updateCourse,
        course,
        lastModified,
        title,
        owner
    }) => {
    const[editing, setEditing] = useState(false)
    const[newTitle, setNewTitle] = useState(title)
    const history = useHistory()
    history.push('/courses/grid')

    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }

    return (
        <div className="card formatted-card">
            <div class="image-container">
                <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top"
                    alt="..."/>
                {
                    editing &&
                    <div class="button-icon-row">
                        <i onClick={() => saveTitle()} className="fas fa-check fa-2x"></i>
                        <i className="fas fa-times fa-2x" onClick={() => setEditing(false)}></i>
                    </div>
                }
            </div>
            <div className="card-body">
                {
                    !editing &&
                    <h5 className="card-title">{course.title}</h5>
                }
                {
                    editing &&
                    <div className="row">
                        <input
                            onChange={(event) => setNewTitle(event.target.value)}
                            value={newTitle}
                            class="form-control inline-input"/>
                    </div>
                }
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Link to="/courses/editor" className="btn btn-primary" onClick={history.push('/courses/grid')}>
                    Go to Editor
                </Link>
            </div>
            <div className="card-footer">
                {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"></i>}
                <i onClick={() => deleteCourse(course)} className="fas fa-trash"></i>
            </div>
        </div>
    )
}
export default CourseCard