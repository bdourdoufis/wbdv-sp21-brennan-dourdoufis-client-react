import CourseManager from "./components/course-manager";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"
import CourseTable from "./components/course-table";
import CourseEditor from "./components/course-editor";

function App() {
  return (
      <BrowserRouter>
        <div className="container-fluid">
          <Route path="/" exact={true}>
            <Home/>
          </Route>
          <Route path="/courses">
            <CourseManager/>
          </Route>
          <Route path="/courses/editor" exact={true}>
            <CourseEditor/>
          </Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
