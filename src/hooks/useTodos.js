import {useCallback, useContext, useEffect, useState} from "react";
import {ServicesContext} from "../contexts"

export const useTodos = () => {
    const {todosService} = useContext(ServicesContext)

    const [todos, setTodos] = useState(undefined)
    const [errorTodos, setErrorTodos] = useState('')
    const isLoadingTodos = !todos && !errorTodos //computed property - делаю вывод основываясь на других данных

    const [errorRemovingTodo, setErrorRemovingTodo] = useState('')
    const [removingId, setRemovingId] = useState('')

    const [errorEditingTodo, setErrorEditingTodo] = useState('')
    const [updatingId, setUpdatingId] = useState('')


    useEffect(() => {
            const fetchData = async () => {
                try {
                    const todos = await todosService.getTodos()
                    console.log(todos)
                    setTodos(todos)
                } catch (error) {
                    setErrorTodos(JSON.stringify(error))
                }
            }
            fetchData()
        }
        , [setTodos, todosService])


    const updateTodo = useCallback(async (id, title) => {

        const foundTodo = todos.find(todo => todo.id === id)

        if (!foundTodo) {
            return
        }
        setUpdatingId(id)
        try {
            //Always base on result that backend returned (updatedTodo)
            const updatedTodo = await todosService.updateTodo({...foundTodo, title})
            const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo)
            setTodos(updatedTodos)
        } catch (e) {
            setErrorEditingTodo(JSON.stringify(e))
        } finally {
            setUpdatingId('')
        }
    }, [setTodos, todos, todosService])

    const removeTodo = useCallback(async (id) => {
        if (!window.confirm("Are you sure to delete an item?")) {
            return
        }
        setRemovingId(id)
        try {
            const removedId = await todosService.deleteTodo(id)
            const updatedTodos = todos.filter(todo => todo.id !== removedId)
            setTodos(updatedTodos)
        } catch (error) {
            setErrorRemovingTodo(JSON.stringify(error))
        } finally {
            setRemovingId('')
        }
    }, [setTodos, todos, todosService])


    const completeTodo = useCallback(async (id,checked) => {

        const originalTodos = [...todos]
        const foundTodo = todos.find(todo => todo.id === id)

        if (!foundTodo) {
            return
        }

        try {
            const fakeUpdatedTodo = {...foundTodo, completed: checked}
            const fakeUpdatedTodos = todos.map(todo => todo.id === id ? fakeUpdatedTodo : todo)
            setTodos(fakeUpdatedTodos)
            console.log('Fake updated Todo')
            console.log(JSON.stringify(fakeUpdatedTodo))
            //Always base on result that backend returned (updatedTodo)
            const updatedTodo = await todosService.updateTodo({...foundTodo, completed: checked})
            const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo)
            //for safety reset with new todos because of date updated with new features
            console.log('Backend finished')
            console.log(JSON.stringify(updatedTodo))
            setTodos(updatedTodos)
        } catch (e) {
            // setErrorEditingTodo(JSON.stringify(e))
            setTodos(originalTodos)
        }
    }, [setTodos, todos, todosService])

    return {
        todos,
        errorTodos,
        isLoadingTodos,
        errorRemovingTodo,
        removingId,
        errorEditingTodo,
        updatingId,
        updateTodo,
        removeTodo,
        completeTodo
    }
}

