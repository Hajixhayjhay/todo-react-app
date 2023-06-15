import {useCallback, useContext, useEffect, useState} from "react";
import {ServicesContext, TasksContext} from "../contexts"

export const useTasks = () => {
    const {tasksService} = useContext(ServicesContext)
    const {tasks, dispatch} = useContext(TasksContext)

//    const [tasks, setTasks] = useState(undefined)
    const [errorTasks, setErrorTasks] = useState('')

    //computed property - делаю вывод основываясь на других данных
    const isLoadingTasks = !tasks && !errorTasks


    const [errorRemovingTask, setErrorRemovingTask] = useState('')
    const [removingId, setRemovingId] = useState('')

    const [errorEditingTask, setErrorEditingTask] = useState('')
    const [updatingId, setUpdatingId] = useState('')


    useEffect(() => {
            const fetchData = async () => {
                try {
                    const tasks = await tasksService.getTasks()
                    console.log(tasks)
                    dispatch({
                        type: 'SET_TASKS',
                        payload: tasks
                    })
                    // setTasks(tasks)
                } catch (error) {
                    setErrorTasks(JSON.stringify(error))
                }
            }
            fetchData()
        }
        , [dispatch, tasksService])


    const uploadTask = useCallback(async (completed, title) => {
        const tempTask = {
            title: title,
            completed: JSON.stringify(completed)
        }

        try {

            const uploadedTask = await tasksService.addTask(tempTask)
            console.log('uploadedTask' + JSON.stringify(uploadedTask))

            dispatch({
                type: 'ADD_TASK',
                payload: uploadedTask
            })
        } catch (e) {
            console.log(e.message)

        }
    }, [dispatch, tasksService])

    const updateTask = useCallback(async (id, title) => {

        const foundTask = tasks.find(todo => todo.id === id)

        if (!foundTask) {
            return
        }
        setUpdatingId(id)
        try {
            //Always base on result that backend returned (updatedTask)
            const updatedTask = await tasksService.updateTask({...foundTask, title})


            dispatch({
                type: 'UPDATE_TASK',
                payload: updatedTask
            })
        } catch (e) {
            setErrorEditingTask(e.message)
        } finally {
            setUpdatingId('')
        }
    }, [ tasks, tasksService])

    const removeTask = useCallback(async (id) => {
        if (!window.confirm("Are you sure to delete an item?")) {
            return
        }

        setRemovingId(id)
        try {
            await tasksService.deleteTask(id)
            dispatch({
                type: 'REMOVE_TASK',
                payload: id
            })

        } catch (error) {
            setErrorRemovingTask(JSON.stringify(error))
        } finally {
            setRemovingId('')
        }
    }, [dispatch, tasksService])


    const completeTask = useCallback(async (id, checked) => {

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

            //Always base on result that backend returned (updatedTask)
            const updatedTask = await tasksService.updateTask({...foundTask, completed: checked})
            // const updatedTasks = tasks.map(todo => todo.id === id ? updatedTask : todo)
            //for safety reset with new todos because of date updated with new features

            dispatch({
                type: 'UPDATE_TASK',
                payload: updatedTask
            })
            // setTasks(updatedTasks)
        } catch (e) {
            // setErrorEditingTodo(JSON.stringify(e))
            // setTasks(originalTasks)

            dispatch({
                type: 'SET_TASKS',
                payload: originalTasks
            })
        }
    }, [dispatch, tasks, tasksService])

    return {
        tasks,
        errorTasks,
        isLoadingTasks,
        errorRemovingTask,
        removingId,
        errorEditingTask,
        updatingId,
        updateTask,
        removeTask,
        completeTask,
        uploadTask
    }
}

