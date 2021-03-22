const WIDGETS_URL = process.env.REACT_APP_WIDGET_URL

export const createWidget = (tid) =>
    fetch(`${WIDGETS_URL}/topics/${tid}/widgets`, {
        method: "POST",
        body: JSON.stringify({type: "HEADING", size: 2, text: "New Widget"}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const findWidgetsForTopic = (tid) =>
    fetch(`${WIDGETS_URL}/topics/${tid}/widgets`, {
        method: "GET"
    }).then(response => response.json());

export const updateWidget = (wid, widget) =>
    fetch(`${WIDGETS_URL}/widgets/${wid}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const deleteWidget = (wid) =>
    fetch(`${WIDGETS_URL}/widgets/${wid}`, {
        method: "DELETE"
    }).then(response => response.json());

const widgetService = {
    createWidget, findWidgetsForTopic, deleteWidget, updateWidget
}

export default widgetService;