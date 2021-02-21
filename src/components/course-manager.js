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
        const newCourse = {
            title: "New Course",
            owner: "me",
            lastModified: "Never"
        }

        courseService.addCourse(newCourse)
            .then(course => this.setState(
                (prevState) => ({
                    ...prevState,
                    courses: [
                        ...prevState.courses,
                        course
                    ]
                })))
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
                <Link to="/courses/grid">
                    <i className="fas fa-2x fa-th float-right"></i>
                </Link>
                <h2>Course Table</h2>
                <table className="table">
                    <tbody>
                    {/*<CourseRow title="CS1234" owner="alice" lastModified={"1/12/34"}/>*/}
                    {/*<CourseRow title="CS2345" owner="bob"   lastModified={"2/23/24"}/>*/}
                    {/*<CourseRow title="CS3456" owner="charlie" lastModified={"3/22/14"}/>*/}
                    {/*<CourseRow title="CS4567" owner="dan"   lastModified={"4/12/36"}/>*/}
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
                            />)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseManager