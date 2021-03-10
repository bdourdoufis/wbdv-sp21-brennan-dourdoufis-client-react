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
                <Route path="/courses/table" exact={true} >
                    <CourseTable
                        addCourse={this.addCourse}
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                </Route>
                <Route path="/courses/grid" exact={true}>
                    <CourseGrid
                        addCourse={this.addCourse}
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                </Route>
            </div>
        )
    }
}
export default CourseManager