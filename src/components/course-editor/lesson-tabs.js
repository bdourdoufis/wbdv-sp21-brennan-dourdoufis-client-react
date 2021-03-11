import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../../services/lesson-service'
import topicService from "../../services/topic-service";

const LessonTabs = (
    {
        lessons=[],
        findLessonsForModule=(moduleId) => lessonService.findLessonsForModule(moduleId),
        createLesson=(moduleId, lesson) => lessonService.createLesson(moduleId, lesson),
        deleteLesson=(lesson) => lessonService.deleteLesson(lesson._id),
        updateLesson=(lesson) => lessonService.updateLesson(lesson._id, lesson)
    }) => {
    const {courseId, moduleId, lessonId, layout} = useParams();
    useEffect(() => {
        if(moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId);
        }
    }, [moduleId])
    return(
        <div>
            <ul className="nav nav-tabs">
                {
                    lessons.map(lesson =>
                        <li className="nav-item lesson-tabs" key={lesson._id}>
                            <EditableItem
                                active={lesson._id === lessonId}
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                                deleteItem={deleteLesson}
                                updateItem={updateLesson}
                                item={lesson}/>
                        </li>
                    )
                }
                <li>
                    <i onClick={() => createLesson(moduleId)} className="fas fa-plus"></i>
                </li>
            </ul>
        </div>)}

const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})
const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => {
        lessonService.findLessonsForModule(moduleId)
            .then(lessons => dispatch({
                type: "FIND_LESSONS_FOR_MODULE",
                lessons
            }));
    },
    createLesson: (moduleId) => {
        lessonService
            .createLesson(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({
                type: "CREATE_LESSON",
                lesson
            }))
    },
    deleteLesson: (lesson) => {
        lessonService.deleteLesson(lesson._id).then(lesson => dispatch({
            type: "DELETE_LESSON",
            lessonToDelete: lesson
        }))
    },
    updateLesson: (lesson) => {
        lessonService.updateLesson(lesson._id, lesson).then(lesson => dispatch({
            type: "UPDATE_LESSON",
            lesson
        }));
    }
})

export default connect(stpm, dtpm)(LessonTabs)