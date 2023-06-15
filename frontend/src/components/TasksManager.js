import {TaskForm} from "./TaskForm";
import {TasksList} from "./TasksList";
import React from "react";
import {useTasks} from "../hooks/useTasks";



export const TasksManager = () => {

    const {
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
    } = useTasks()


    return (
        <>
            <TaskForm
                onSubmit={uploadTask}
            />
            <TasksList
                tasks={tasks}
                isLoadingTasks={isLoadingTasks}
                errorTasks={errorTasks}
                updateTask={updateTask}
                updatingId={updatingId}
                removingId={removingId}
                removeTask={removeTask}
                completeTask={completeTask}
            />
        </>
    )
}