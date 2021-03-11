import React from 'react'
import {Link} from "react-router-dom";
import courseService from "../services/course-service";
import {combineReducers, createStore} from "redux";
import moduleReducer from "../reducers/module-reducer";
import lessonReducer from "../reducers/lesson-reducer";
import topicReducer from "../reducers/topic-reducer";
import {Provider} from "react-redux";
import ModuleList from "./course-editor/module-list";
import LessonTabs from "./course-editor/lesson-tabs";
import TopicPills from "./course-editor/topic-pills";

const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer
})

const store = createStore(reducer)

class CourseEditor extends React.Component {
    state = {
        courseName: "",
        modules: [],
        lessons: [],
        topics: []
    }

    render() {
        const {courseId} = this.props.match.params;
        const {layout} = this.props.match.params;
        courseService.findCourseById(courseId).then(foundCourse => this.setState(
            (prevState) => ({
                courseName: foundCourse.title
            })))
        return(
        <Provider store={store}>
            <div>
                <h2>
                    <Link to={"/courses/" + layout}>
                        <i className="fas fa-arrow-left float-left"></i>
                    </Link>
                    {this.state.courseName}
                </h2>
                <div className="row">
                    <div className="col-4">
                        <ModuleList/>
                    </div>
                    <div className="col-8">
                        <LessonTabs/>
                        <br/>
                        <TopicPills/>
                    </div>
                </div>
            </div>
        </Provider>)
    }
}
export default CourseEditor