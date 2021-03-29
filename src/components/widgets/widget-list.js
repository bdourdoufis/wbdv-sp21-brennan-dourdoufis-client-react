import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import ListWidget from "./list-widget"
import ImageWidget from "./image-widget";
import {useParams} from "react-router-dom"
import widgetService, {findWidgetsForTopic} from "../../services/widget-service";
import {connect} from "react-redux";

const WidgetList = (
    {
        widgets,
        createWidget,
        updateWidget,
        deleteWidget,
        findWidgetsForTopic
    }) => {
    const {topicId} = useParams()
    const [widget, setWidget] = useState({})
    useEffect(() => {
        if (topicId !== "undefined" && typeof topicId !== "undefined") {
            findWidgetsForTopic(topicId)
        }
    }, [])
    return(
        <div>
            <i onClick={() => createWidget(topicId)} className="fas fa-plus float-right fa-2x"></i>
            <h1>Widget List ({widgets.length})</h1>
            <ul className="list-group">
                {
                    widgets && widgets.map(_widget =>
                        <li key={_widget.id} className="list-group-item">
                            {
                                _widget.id === widget.id &&
                                <>
                                    <i onClick={() => deleteWidget(_widget)} className="fas fa-trash float-right"></i>
                                    <i onClick={() => {
                                        updateWidget(_widget.id, widget)
                                        setWidget({})
                                    }} className="fas fa-check float-right"></i>
                                </>
                            }
                            {
                                _widget.id !== widget.id &&
                                <i onClick={() => setWidget(_widget)} className="fas fa-cog float-right"></i>
                            }
                            {
                                _widget.type === "HEADING" && _widget.id === widget.id &&
                                <HeadingWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={widget}/>
                            }
                            {
                                _widget.type === "HEADING" && _widget.id !== widget.id &&
                                <HeadingWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                            {
                                _widget.type === "PARAGRAPH" && _widget.id === widget.id &&
                                <ParagraphWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={widget}/>
                            }
                            {
                                _widget.type === "PARAGRAPH" && _widget.id !== widget.id &&
                                <ParagraphWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                            {
                                _widget.type === "LIST" && _widget.id === widget.id &&
                                    <ListWidget
                                        setWidget={setWidget}
                                        editing={_widget.id === widget.id}
                                        widget={widget}/>
                            }
                            {
                                _widget.type === "LIST" && _widget.id !== widget.id &&
                                <ListWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                            {
                                _widget.type === "IMAGE" && _widget.id === widget.id &&
                                    <ImageWidget
                                        setWidget={setWidget}
                                        editing={_widget.id === widget.id}
                                        widget={widget}/>
                            }
                            {
                                _widget.type === "IMAGE" && _widget.id !== widget.id &&
                                <ImageWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
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
        updateWidget: (wid, widget) =>
            widgetService.updateWidget(wid, widget)
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