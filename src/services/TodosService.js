import axios from "axios";

export class TodosService {

    urlTodos = 'https://6479c6dda455e257fa63bf4b.mockapi.io/todos'

    async getTodos() {
        const response = await axios.get(this.urlTodos)
        return response.data
    }


    async deleteTodo(id){
        await new Promise(resolve => setTimeout(() => resolve(), 1000))
        const response = await axios.delete(this.urlTodos+`/${id}`)
        return response.data.id
    }


    async uploadTodo(todo) {
        await new Promise(resolve => setTimeout(() => resolve(), 2000))
        console.log(JSON.stringify(this.urlTodos))
        console.log(JSON.stringify(todo))
        const response =  await axios.post(this.urlTodos , todo)
        return response.data
    }


    async updateTodo(todo) {
        await new Promise(resolve => setTimeout(() => resolve(), 2000))
        const response =  await axios.put(this.urlTodos + `/${todo.id}`, todo)
        return response.data
    }
}

