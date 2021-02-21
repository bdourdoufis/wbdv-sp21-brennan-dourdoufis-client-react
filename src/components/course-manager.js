import React from 'react'
import CourseTable from "./course-table";
import CourseGrid from "./course-grid";
import CourseEditor from "./course-editor";
import {Link, Route} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse} from "../services/course-service";

class CourseManager extends React.Component {
    state = {
        courses: [],
    }

    componentDidMount = () => findAllCourses().then(courses => this.setState({courses}))

    addCourse = () => {
        if (document.getElementById("new-course-title").value == "") {
            alert("Cannot add a course with no name. Please enter a name and try again.");
        } else {
            const newCourse = {
                title: document.getElementById("new-course-title").value,
                owner: "me",
                lastModified: "Never"
            }

            courseService.createCourse(newCourse)
                .then(course => this.setState(
                    (prevState) => ({
                        ...prevState,
                        courses: [
                            ...prevState.courses,
                            course
                        ]
                    })))
                .then(document.getElementById("new-course-title").value = "")
        }
    }

    updateCourse = (course) => {
        courseService.updateCourse(course._id, course)
            .then(status => this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.map((c) => c._id === course._id ? course : c)
            })))
    }

    deleteCourse = (courseToDelete) => {
        courseService.deleteCourse(courseToDelete._id)
            .then(status => {
                this.setState((prevState) => ({
                    ...prevState,
                    courses: prevState.courses.filter(course => course !== courseToDelete)
                }))
            })
    }

    render() {
        return(
            <div>
                <Link to="/">
                    <i className="fas fa-2x fa-home float-right"></i>
                </Link>
                <h1>Course Manager</h1>
                <input type="text" id="new-course-title" className="title-input-bar" placeholder="New Course Title"></input>
                <button class="btn btn-main btn-danger btn-primary btn-circle pull-right" onClick={this.addCourse}><i className="fa fa-plus"></i></button>
                <Route path="/courses/table" exact={true} >
                    <CourseTable
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                </Route>
                <Route path="/courses/grid" exact={true} >
                    <CourseGrid courses={this.state.courses}/>
                </Route>
                <button type="button" className="btn btn-main btn-danger btn-primary btn-circle bottom-button"
                        data-placement="right" title="Menu" onClick={this.addCourse}><i className="fa fa-plus"></i></button>
            </div>
        )
    }
}
export default CourseManager