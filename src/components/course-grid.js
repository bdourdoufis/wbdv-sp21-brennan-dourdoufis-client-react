import React from 'react'
import {Link} from "react-router-dom";
import CourseCard from "./course-card";

export default class CourseGrid
    extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <h1>Course Manager</h1>
                <input type="text" id="new-course-title" className="title-input-bar"
                       placeholder="New Course Title"></input>
                <button className="btn btn-main btn-danger btn-primary btn-circle pull-right" onClick={this.props.addCourse}>
                    <i className="fa fa-plus"></i></button>
                <Link to="/courses/table">
                    <i className="fas fa-2x fa-list float-right"></i>
                </Link>
                <div className="row">
                    {
                        this.props.courses.map((course, ndx) =>
                            <CourseCard
                                updateCourse={this.props.updateCourse}
                                deleteCourse={this.props.deleteCourse}
                                key={ndx}
                                course={course}
                                title={course.title}
                                owner={course.owner}
                                lastModified={course.lastModified}
                            />)
                    }
                </div>
                <button type="button" className="btn btn-main btn-danger btn-primary btn-circle bottom-button"
                        data-placement="right" title="Menu" onClick={this.props.addCourse}><i className="fa fa-plus"></i></button>
            </div>
        )
    }
}