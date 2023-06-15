import React, {useState} from "react";

import {debounce} from "lodash";
import {useAddTask} from "../hooks/useAddTask";
import {Spinner} from "./Spinner";


export const TaskForm = () => {

    const {
        error,
        isLoading,
        uploadTask
    } = useAddTask()

    // const {uploadTodo} = useTodos()
    const [isCompleted, setCompleted] = useState(false)
    const [title, setTitle] = useState('')


    const handleAddTask = async () => {
        await uploadTask(isCompleted, title);
        setCompleted(false);
        setTitle('');
    };

    return (
        <div className="todo-form">
            <input type="checkbox"
                   checked={isCompleted}
                   onChange={event => setCompleted(event.target.checked)}/>
            <input type="text"
                   placeholder="Add Tasks"
                   value={title}
                   onChange={event => {
                       setTitle(event.target.value)
                   }}
            />
            {isLoading ? <Spinner/> : <button onClick={handleAddTask}>Add</button>}
        </div>
    )
};
