import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";

export default class CourseTable
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
                <Link to="/courses/grid">
                    <i className="fas fa-2x fa-th float-right"></i>
                </Link>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned by</th>
                        <th>Last Modified</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.courses.map((course, ndx) =>
                            <CourseRow
                                updateCourse={this.props.updateCourse}
                                deleteCourse={this.props.deleteCourse}
                                key={ndx}
                                course={course}
                                title={course.title}
                                owner={course.owner}
                                lastModified={course.lastModified}
                                allCourses={this.props.courses}
                            />)
                    }
                    </tbody>
                </table>
                <button type="button" className="btn btn-main btn-danger btn-primary btn-circle bottom-button"
                        data-placement="right" title="Menu" onClick={this.props.addCourse}><i className="fa fa-plus"></i></button>
            </div>
        )
    }
}