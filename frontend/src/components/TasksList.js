import React from 'react';
import TaskItem from "./TaskItem";

export const TasksList = ({tasks,isLoadingTasks,errorTasks,updateTask,updatingId,removingId,removeTask,completeTask}) => {

    if (isLoadingTasks) {
        return <span>Is Loading</span>
    }

    if (errorTasks) {
        return <span>error</span>
    }

    return (
        <ul className="todo-list">
            {tasks.map(task =>
                <li key={task.id}>
                    <TaskItem
                        taskItem={task}
                        onUpdate={(title) => updateTask(task.id, title)}
                        loading={updatingId === task.id || removingId === task.id}
                        onRemove={() => removeTask(task.id)}
                        onCompleted={(checked) => completeTask(task.id,checked)}
                        // errorRemovingTodo={errorRemovingTodo}
                        // onEdit={(id,title,completed) => editTodo(id, title, completed)}
                        // onRemove={() => removeTodo(task.id)}
                        // errorDeletingTodo={errorDeletingTodo}
                        // isDeletingTodo={isDeletingTodo}
                        // errorEditingTodo={errorEditingTodo}
                        // isEditingTodo={isEditingTodo}
                        // setIsEditingTodo={setIsEditingTodo}

                    />
                </li>)}
        </ul>
    )
};


