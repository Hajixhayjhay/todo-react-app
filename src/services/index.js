import {TodosService} from "./TodosService"

export const initServices = () => {
    const todosService = new TodosService()

    return {todosService} //may be more services in future
}

