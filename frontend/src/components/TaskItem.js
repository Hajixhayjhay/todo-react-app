import React, {useMemo, useState} from "react";
import {Spinner} from "./Spinner";
import {debounce} from 'lodash'
import {useTask} from "../hooks/useTask";

const TaskItem = ({task}) => {

    const {
        error,
        isLoading,
        updateTask,
        removeTask,
        completeTask
    } = useTask(task.id)

    const [isEditMode, setEditMode] = useState(false)
    //if this value null of undefined => fallback with the value from the right side
    //it is nullish operator like OR operator but triggers only on NULL or UNDEFINED
    const [title, setTitle] = useState(task.title ?? "")
    const debouncedDelete = debounce(removeTask, 1000)
    // const debouncedComplete = debounce(() => completeTask(JSON.stringify(result)),1000)

    const handleComplete = (event) => {
        const result = event.target.checked
        completeTask(result)
        console.log(`result: ${result}`)

        console.log({event, result})
    }


    const buttons = (
        <>
            {isEditMode ? (
                <button className="save-button"
                        onClick={async () => {
                            await updateTask(title)
                            setEditMode(false)
                        }}>Save
                </button>
            ) : (
                <button className="edit-button"
                        onClick={() => {
                            setEditMode(true)
                        }}>Edit
                </button>
            )}
            <button className="delete" onClick={debouncedDelete}>Delete
            </button>
        </>)


    return (
        <div className="todo-item">
            <div className="todo-item-checkbox">
                <input
                    type="checkbox" checked={task.completed}
                    onChange={handleComplete}/>
            </div>
            <div className="todo-item-title">
                {isEditMode ? (
                    <input
                        type="text"
                        value={title} onChange={e => {
                        setTitle(e.target.value)
                    }
                    }/>
                ) : (<span>{task.title}</span>)}
            </div>
            <div className="todo-item-buttons">
                {isLoading ? (<Spinner/>) : buttons}
            </div>
        </div>
    )
}

export default TaskItem;