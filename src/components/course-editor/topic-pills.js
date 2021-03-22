import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import topicService from '../../services/topic-service'

const TopicPills = (
    {
        topics=[],
        createTopic=(topic) => topicService.createTopic(topic),
        deleteTopic=(topic) => topicService.deleteTopic(topic._id),
        updateTopic=(topic) => topicService.updateTopic(topic._id, topic),
        findTopicsForLesson=(lessonId) => topicService.findTopicsForLesson(lessonId)
    }) => {
    const {courseId, moduleId, lessonId, layout} = useParams();
    useEffect(() => {
        if(lessonId !== "undefined" && typeof lessonId !== "undefined") {
            findTopicsForLesson(lessonId);
        }
    }, [])
    return(
        <div>
            <ul className="nav nav-pills">
                {
                    topics.map(topic =>
                        <li className="nav-item topic-pills" key={topic._id}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                                updateItem={updateTopic}
                                deleteItem={deleteTopic}
                                active={true}
                                item={topic}/>
                        </li>
                    )
                }
                <li className="list-group-item">
                    <i onClick={() => createTopic(lessonId)} className="fas fa-plus fa-2x"></i>
                </li>
            </ul>
        </div>)}

const stpm = (state) => {
    return {
        topics: state.topicReducer.topics
    }
}
const dtpm = (dispatch) => {
    return {
        createTopic: (lessonId) => {
            topicService.createTopic(lessonId, {title: "New Topic"})
                .then(topic => dispatch({
                    type: "CREATE_TOPIC",
                    topic
                }))
        },
        deleteTopic: (item) =>
            topicService.deleteTopic(item._id)
                .then(status => dispatch({
                    type: "DELETE_TOPIC",
                    topicToDelete: item
                })),
        updateTopic: (topic) =>
            topicService.updateTopic(topic._id, topic)
                .then(status => dispatch({
                    type: "UPDATE_TOPIC",
                    topic
                })),
        findTopicsForLesson: (lessonId) => {
            topicService.findTopicsForLesson(lessonId)
                .then(topics => dispatch({
                    type: "FIND_TOPICS_FOR_LESSON",
                    topics: topics
                }))
        }
    }
}

export default connect(stpm, dtpm)
(TopicPills)