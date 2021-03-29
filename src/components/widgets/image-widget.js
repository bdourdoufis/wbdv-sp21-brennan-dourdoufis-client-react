import React from 'react'

const ImageWidget = ({widget, setWidget, editing}) => {
    return (
        <div>
            <h2>Image Widget {widget.id}</h2>
            <img src={widget.url} width={widget.width} height={widget.height}/>
            {
                editing &&
                <div>
                    Image URL
                    <input value={widget.url} onChange={(e) => setWidget({...widget, url: e.target.value})} className="form-control"/>
                    Image Width
                    <input value={widget.width} onChange={(e) => setWidget({...widget, width: e.target.value})} className="form-control"/>
                    Image Height
                    <input value={widget.height} onChange={(e) => setWidget({...widget, height: e.target.value})} className="form-control"/>
                </div>
            }
        </div>
    )
}

export default ImageWidget