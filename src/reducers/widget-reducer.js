const initialState = {
    widgets: []
}

const widgetReducer = (state=initialState, action) => {
    switch (action.type) {
        case "CREATE_WIDGET":
            const newState = {
                widgets: [
                    ...state.widgets,
                    action.widget
                ]
            }
            return newState
        case "FIND_WIDGETS_FOR_TOPIC":
            return {
                ...state,
                widgets: action.widgets
            }
        case "DELETE_WIDGET":
            const newState1 = {
                widgets: state.widgets.filter(widget => {
                    if(widget.id === action.widgetToDelete.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case "UPDATE_WIDGET":
            return {
                widgets: state.widgets.map(w => {
                    if(w.id === action.widget.id) {
                        return action.widget
                    } else {
                        return w
                    }
                })
            }
        default:
            return state
    }
}
export default widgetReducer