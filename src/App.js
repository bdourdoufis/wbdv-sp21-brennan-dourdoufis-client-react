import CourseManager from "./components/course-manager";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"
import CourseEditor from "./components/course-editor";
import QuizzesList from "./components/quizzes/quizzes-list";
import Quiz from "./components/quizzes/quiz"

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
                <Route path="/courses/:layout/edit/:courseId" exact={true}
                       render={(props) => <CourseEditor {...props}/>}/>
                <Route path="/courses/:layout/edit/:courseId/modules/:moduleId" exact={true}
                       render={(props) => <CourseEditor {...props}/>}/>
                <Route path="/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId" exact={true}
                       render={(props) => <CourseEditor {...props}/>}/>
                <Route path="/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId" exact={true}
                       render={(props) => <CourseEditor {...props}/>}/>
                <Route path="/courses/:courseId/quizzes" exact={true}
                       render={(props) => <QuizzesList {...props}/>}/>
                <Route path="/courses/:courseId/quizzes/:quizId" exact={true}
                       render={(props) => <Quiz {...props}/>}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
