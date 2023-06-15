import {useContext, useEffect, useState} from "react";
import {ServicesContext, TasksContext} from "../contexts";


export const useGetTasks = () => {
    const {tasksService} = useContext(ServicesContext)
    const {tasks, dispatch} = useContext(TasksContext)

    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const tasks = await tasksService.getTasks()
                    console.log(tasks)
                    dispatch({
                        type: 'SET_TASKS',
                        payload: tasks
                    })
                } catch (error) {
                    setError(error.message)
                } finally {
                    setLoading(false)
                }
            }

            fetchData()
        }
        , [dispatch, tasksService])

    return {
        tasks,
        error,
        isLoading
    }
}
