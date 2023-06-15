import {useCallback, useContext, useState} from "react";
import {ServicesContext, TasksContext} from "../contexts";


export const useTask = (id) => {

    const {tasksService} = useContext(ServicesContext)
    const {tasks, dispatch} = useContext(TasksContext)

    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)



    const updateTask = useCallback(async (title) => {


        const foundTask = tasks.find(todo => todo.id === id)

        if (!foundTask) {
            return
        }
        setError('')
        setLoading(true)
        try {
            //Always base on result that backend returned (updatedTask)
            const updatedTask = await tasksService.updateTask({...foundTask, title})


            dispatch({
                type: 'UPDATE_TASK',
                payload: updatedTask
            })
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [dispatch, id, tasks, tasksService])

    const removeTask = useCallback(async () => {
        if (!window.confirm("Are you sure to delete an item?")) {
            return
        }

        setError('')
        setLoading(true)
        try {
            await tasksService.deleteTask(id)
            dispatch({
                type: 'REMOVE_TASK',
                payload: id
            })

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [dispatch, id, tasksService])


    const completeTask = useCallback(async (checked) => {

        const originalTasks = [...tasks]
        const foundTask = tasks.find(todo => todo.id === id)

        if (!foundTask) {
            return
        }

        try {
            const fakeUpdatedTask = {...foundTask, completed: checked}
            // const fakeUpdatedTasks = tasks.map(todo => todo.id === id ? fakeUpdatedTask : todo)
            // setTasks(fakeUpdatedTasks)
            dispatch({
                type: 'UPDATE_TASK',
                payload: fakeUpdatedTask
            })

            await tasksService.updateTask({...foundTask, completed: checked})

        } catch (error) {
            console.log(error)
            // setErrorEditingTodo(JSON.stringify(e))
            // setTasks(originalTasks)

            dispatch({
                type: 'SET_TASKS',
                payload: originalTasks
            })
        }
    }, [dispatch, id, tasks, tasksService])


    return{
        error,
        isLoading,
        updateTask,
        removeTask,
        completeTask
    }
}