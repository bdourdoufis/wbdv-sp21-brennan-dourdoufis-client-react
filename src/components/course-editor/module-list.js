import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../../services/module-service";
import lessonService from '../../services/lesson-service'
import topicService from "../../services/topic-service";

const ModuleList = (
    {
        modules=[],
        createModule=(module) => moduleService.createModule(module),
        deleteModule=(module) => moduleService.deleteModule(module._id),
        updateModule=(module) => moduleService.updateModule(module._id, module),
        findModulesForCourse=(courseId) => moduleService.findModulesForCourse(courseId)
    }) => {
    const {courseId, moduleId, layout} = useParams();
    useEffect(() => {
        findModulesForCourse(courseId)
    }, [])
    return(
        <div>
            <ul className="list-group">
                {
                    modules.map(module =>
                        <li className={`list-group-item ${module._id === moduleId ? 'active' : ''}`} key={module._id}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
                                active={true}
                                item={module}/>
                        </li>
                    )
                }
                <li className="list-group-item">
                    <i onClick={() => createModule(courseId)} className="fas fa-plus fa-2x"></i>
                </li>
            </ul>
        </div>)}

const stpm = (state) => {
    return {
        modules: state.moduleReducer.modules
    }
}
const dtpm = (dispatch) => {
    return {
        createModule: (courseId) => {
            moduleService.createModule(courseId, {title: "New Module"})
                .then(theActualModule => dispatch({
                    type: "CREATE_MODULE",
                    module: theActualModule
                }))
        },
        deleteModule: (item) =>
            moduleService.deleteModule(item._id)
                .then(status => dispatch({
                    type: "DELETE_MODULE",
                    moduleToDelete: item
                })),
        updateModule: (module) =>
            moduleService.updateModule(module._id, module)
                .then(status => dispatch({
                    type: "UPDATE_MODULE",
                    module
                })),
        findModulesForCourse: (courseId) => {
            topicService.findTopicsForLesson(undefined).then(topics => dispatch({
                type: "FIND_TOPICS_FOR_LESSON",
                topics
            }));
            lessonService.findLessonsForModule(undefined).then(lessons => dispatch({
                type: "FIND_LESSONS_FOR_MODULE",
                lessons
            }));
            moduleService.findModulesForCourse(courseId)
                .then(theModules => dispatch({
                    type: "FIND_MODULES_FOR_COURSE",
                    modules: theModules
                }));
        }
    }
}

export default connect(stpm, dtpm)
(ModuleList)