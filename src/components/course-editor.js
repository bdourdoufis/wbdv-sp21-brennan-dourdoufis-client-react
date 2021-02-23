import React from 'react'
import {Link} from "react-router-dom";

const CourseEditor = () =>
    <div>
        <Link to="/courses/table">
            <i className="fas fa-arrow-left float-left fa-3x"></i>
        </Link>
        <h1>Course Editor</h1>
        <div className="row">
            <div className="col-4">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-dark">Module 1 - JQuery
                        <button className="fa fa-times pull-right btn bg-transparent"></button>
                    </li>
                    <li className="list-group-item active list-group-item-dark">Module 2 - React
                        <button className="fa fa-times pull-right btn bg-transparent"></button>
                    </li>
                    <li className="list-group-item list-group-item-dark">Module 3 - Redux
                        <button className="fa fa-times pull-right btn bg-transparent"></button>
                    </li>
                    <li className="list-group-item list-group-item-dark">Module 4 - Native
                        <button className="fa fa-times pull-right btn bg-transparent"></button>
                    </li>
                    <li className="list-group-item list-group-item-dark">Module 5 - Angular
                        <button className="fa fa-times pull-right btn bg-transparent"></button>
                    </li>
                    <li className="list-group-item list-group-item-dark">Module 6 - Node
                        <button className="fa fa-times pull-right btn bg-transparent"></button>
                    </li>
                    <li className="list-group-item list-group-item-dark">Module 7 - Mongo
                        <button className="fa fa-times pull-right btn bg-transparent"></button>
                    </li>
                </ul>
            </div>
            <div className="col-8">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">
                            Build
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Pages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Theme</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Store</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Apps</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a>
                    </li>
                </ul>
                <br/>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Topic 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Topic 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Topic 3</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Topic 4</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">+</a>
                    </li>
                </ul>
                <p>Module content goes here.</p>
            </div>
        </div>
    </div>

export default CourseEditor