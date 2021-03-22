import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom"
import widgetService, {findWidgetsForTopic} from "../../services/widget-service";
import {connect} from "react-redux";

const WidgetList = (
    {
        widgets = [],
        createWidget=(tid,widget) => widgetService.createWidget(tid),
        updateWidget=(widgetId,widget) => widgetService.updateWidget(widgetId, widget),
        deleteWidget=(widgetId) => widgetService.deleteWidget(widgetId),
        findWidgetsForTopic=(tid) => widgetService.findWidgetsForTopic(tid)
    }) => {
    const {topicId} = useParams()
    const [editingWidget, setEditingWidget] = useState({});
    useEffect(() => {
        if (topicId !== "undefined" && typeof topicId !== "undefined") {
            findWidgetsForTopic(topicId)
        }
    }, [topicId])
    return(
        <div>
            <i onClick={() => createWidget(topicId)} className="fas fa-plus float-right fa-2x"></i>
            <h1>Widget List ({widgets.length})</h1>
            <ul className="list-group">
                {
                    widgets.map(widget =>
                        <li key={widget.id} className="list-group-item">
                            {
                                editingWidget.id === widget.id &&
                                <>
                                    <i onClick={() => deleteWidget(widget.id)} className="fas fa-trash float-right"></i>
                                    <i onClick={() => {
                                        updateWidget(widget.id, widget)
                                    }} className="fas fa-check float-right"></i>
                                </>
                            }
                            {
                                editingWidget.id !== widget.id &&
                                <i onClick={() => setEditingWidget(widget)} className="fas fa-2x fa-cog float-right"></i>
                            }
                            {
                                widget.type === "HEADING" &&
                                <HeadingWidget
                                    editing={widget.id === editingWidget.id}
                                    setWidget={setEditingWidget}
                                    widget={widget}/>
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    editing={widget.id === editingWidget.id}
                                    setWidget={setEditingWidget}
                                    widget={widget}/>
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
const stpm = (state) => {
    return {
        widgets: state.widgetReducer.widgets
    }
}
const dtpm = (dispatch) => {
    return {
        createWidget: (topicId) => {
            widgetService.createWidget(topicId)
                .then(widget => dispatch({
                    type: "CREATE_WIDGET",
                    widget
                }))
        },
        deleteWidget: (widget) =>
            widgetService.deleteWidget(widget.id)
                .then(response => dispatch({
                    type: "DELETE_WIDGET",
                    widgetToDelete: widget
                })),
        updateWidget: (widget) =>
            widgetService.updateWidget(widget.id, widget)
                .then(response => dispatch({
                    type: "UPDATE_WIDGET",
                    widget
                })),
        findWidgetsForTopic: (topicId) => {
            widgetService.findWidgetsForTopic(topicId)
                .then(widgets => dispatch({
                    type: "FIND_WIDGETS_FOR_TOPIC",
                    widgets: widgets
                }))
        }
    }
}

export default connect(stpm, dtpm)
(WidgetList)