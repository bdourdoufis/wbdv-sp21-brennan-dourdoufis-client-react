const COURSES_URL = "https://wbdv-generic-server.herokuapp.com/api/001642694/courses"
const MODULES_URL = "https://wbdv-generic-server.herokuapp.com/api/001642694/modules"

export const createModule = (courseId, module) =>
    fetch(`${COURSES_URL}/${courseId}/modules`, {
        method: "POST",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const updateModule = (moduleId, module) =>
    fetch(`${MODULES_URL}/${moduleId}`, {
        method: "PUT",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const findModulesForCourse = (courseId) =>
    fetch(`${COURSES_URL}/${courseId}/modules`)
        .then(response => response.json());

export const deleteModule = (moduleId) =>
    fetch(`${MODULES_URL}/${moduleId}`, {
        method: 'DELETE'
    })
        .then(response => response.json());

export const findModule = (moduleId) =>
    fetch(`${MODULES_URL}/${moduleId}`)
        .then(response => response.json());

const moduleService = {
    createModule, findModulesForCourse, deleteModule, updateModule, findModule
}

export default moduleService;