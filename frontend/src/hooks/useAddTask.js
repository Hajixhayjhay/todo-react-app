import {useCallback, useContext, useState} from "react";
import {ServicesContext, TasksContext} from "../contexts";


export const useAddTask = () => {

    const {tasksService} = useContext(ServicesContext)
    const {dispatch} = useContext(TasksContext)

    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const uploadTask = useCallback(async (completed, title) => {
        const tempTask = {
            title: title,
            completed: completed
        }

        setLoading(true)
        try {

            const uploadedTask = await tasksService.addTask(tempTask)
            console.log('uploadedTask' + JSON.stringify(uploadedTask))

            dispatch({
                type: 'ADD_TASK',
                payload: uploadedTask
            })
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }, [dispatch, tasksService])

    return{
        error,
        isLoading,
        uploadTask
    }
}