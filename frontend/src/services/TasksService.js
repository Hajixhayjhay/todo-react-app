import axios from "axios";

export class TasksService {

    urlTodos = 'http://localhost:4000/tasks'

    async getTasks() {
        const response = await axios.get(this.urlTodos)
        return response.data
    }

    async deleteTask(id){
        await new Promise(resolve => setTimeout(() => resolve(), 1000))
        console.log(id)
        const response = await axios.delete(this.urlTodos+`/${id}`)
        return response.data.id
    }

    async uploadTask(todo) {
        await new Promise(resolve => setTimeout(() => resolve(), 2000))
        console.log(JSON.stringify(this.urlTodos))
        console.log(JSON.stringify(todo))
        const response =  await axios.post(this.urlTodos , todo)
        return response.data
    }


    async updateTask(todo) {
        await new Promise(resolve => setTimeout(() => resolve(), 2000))
        const response =  await axios.patch(this.urlTodos + `/${todo.id}`, todo)
        return response.data
    }
}

