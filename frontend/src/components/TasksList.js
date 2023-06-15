import React, {useContext} from 'react';
import TaskItem from "./TaskItem";
import {useGetTasks} from "../hooks/useGetTasks";
import {TasksContext} from "../contexts";

export const TasksList = ({
                              updateTask,
                              updatingId,
                              removingId,
                              removeTask,
                              completeTask
                          }) => {

    const {tasks, error, isLoading} = useGetTasks()

    if (isLoading) {
        return <span>Is Loading</span>
    }

    if (error) {
        return <span>error</span>
    }

    return (
        <ul className="todo-list">
            {tasks.map(task =>
                <li key={task.id}>
                    <TaskItem
                        task={task}
                    />
                </li>)}
        </ul>
    )
};


