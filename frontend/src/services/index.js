import {TasksService} from "./TasksService"

export const initServices = () => {
    const tasksService = new TasksService()

    return {tasksService} //may be more services in future
}

