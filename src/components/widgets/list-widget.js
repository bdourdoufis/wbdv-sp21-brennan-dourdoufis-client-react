import React from 'react'

const ListWidget = ({widget, setWidget, editing}) => {
    return (
        <div>
            <h2>List Widget {widget.id}</h2>
            {
                !editing &&
                <>
                    {
                        widget.ordered &&
                        <ol>
                            {
                                widget.text.split("\n").map(item => {
                                    return(
                                        <li>{item}</li>
                                    )
                                })
                            }
                        </ol>
                    }
                    {
                        !widget.ordered &&
                        <ul>
                            {
                                widget.text.split("\n").map(item => {
                                    return(
                                        <li>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    }
                </>
            }
            {
                editing &&
                <div>
                    <select onChange={(e) => setWidget(widget=>({...widget, type: e.target.value}))} value={widget.type} className="form-control">
                        <option value={"HEADING"}>Heading</option>
                        <option value={"PARAGRAPH"}>Paragraph</option>
                        <option value={"LIST"}>List</option>
                        <option value={"IMAGE"}>Image</option>
                    </select>
                    <input type="checkbox" checked={widget.ordered} onChange={(e) => setWidget({...widget, ordered: e.target.checked})}/> Ordered
                    <br/>
                    List Items
                    <textarea rows={10} value={widget.text} onChange={(e) => setWidget({...widget, text: e.target.value})} className="form-control">

                    </textarea>
                </div>
            }
        </div>
    )
}

export default ListWidget