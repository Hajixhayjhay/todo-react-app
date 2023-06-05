import {useCallback, useContext, useEffect, useState} from "react";
import {ServicesContext} from "../contexts"

export const useTasks = () => {
    const {tasksService} = useContext(ServicesContext)

    const [tasks, setTasks] = useState(undefined)
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
                    const todos = await tasksService.getTasks()
                    console.log(todos)
                    setTasks(todos)
                } catch (error) {
                    setErrorTasks(JSON.stringify(error))
                }
            }
            fetchData()
        }
        , [setTasks, tasksService])


    const uploadTask = useCallback(async (completed, title) => {
        const tempTask = {
            id: JSON.stringify(Date.now()),
            title: title,
            completed: JSON.stringify(completed)
        }
        console.log('tempTask' + JSON.stringify(tempTask))
        const originalTasks = [...tasks]
        console.log('originalTasks' + JSON.stringify(originalTasks))


        try {
            const fakeUploadedTasks = [...tasks, tempTask]
            console.log('fakeUploadedTasks' + JSON.stringify(fakeUploadedTasks))

            setTasks(fakeUploadedTasks)

            const uploadedTask = await tasksService.uploadTask(tempTask)
            console.log('uploadedTask' + JSON.stringify(uploadedTask))
            const updatedTasks = [...tasks, uploadedTask]
            console.log('updatedTasks' + JSON.stringify(updatedTasks))
            setTasks(updatedTasks)

        } catch (e) {
            console.log('originalTasks' + JSON.stringify(originalTasks))
            setTasks(originalTasks)
        }
    }, [tasks, tasksService])

    const updateTask = useCallback(async (id, title) => {

        const foundTask = tasks.find(todo => todo.id === id)

        if (!foundTask) {
            return
        }
        setUpdatingId(id)
        try {
            //Always base on result that backend returned (updatedTask)
            const updatedTask = await tasksService.updateTask({...foundTask, title})
            const updatedTasks = tasks.map(todo => todo.id === id ? updatedTask : todo)
            setTasks(updatedTasks)
        } catch (e) {
            setErrorEditingTask(JSON.stringify(e))
        } finally {
            setUpdatingId('')
        }
    }, [setTasks, tasks, tasksService])

    const removeTask = useCallback(async (id) => {
        if (!window.confirm("Are you sure to delete an item?")) {
            return
        }
        setRemovingId(id)
        try {
            await tasksService.deleteTask(id)
            const updatedTasks = tasks.filter(todo => todo.id !== id)
            setTasks(updatedTasks)
        } catch (error) {
            setErrorRemovingTask(JSON.stringify(error))
        } finally {
            setRemovingId('')
        }
    }, [setTasks, tasks, tasksService])


    const completeTask = useCallback(async (id, checked) => {

        const originalTasks = [...tasks]
        const foundTask = tasks.find(todo => todo.id === id)

        if (!foundTask) {
            return
        }

        try {
            const fakeUpdatedTask = {...foundTask, completed: checked}
            const fakeUpdatedTasks = tasks.map(todo => todo.id === id ? fakeUpdatedTask : todo)
            setTasks(fakeUpdatedTasks)

            //Always base on result that backend returned (updatedTask)
            const updatedTask = await tasksService.updateTask({...foundTask, completed: checked})
            const updatedTasks = tasks.map(todo => todo.id === id ? updatedTask : todo)
            //for safety reset with new todos because of date updated with new features

            setTasks(updatedTasks)
        } catch (e) {
            // setErrorEditingTodo(JSON.stringify(e))
            setTasks(originalTasks)
        }
    }, [setTasks, tasks, tasksService])

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

