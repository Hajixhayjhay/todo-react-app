import React, {useState} from "react";

import {debounce} from "lodash";


export const TaskForm = ({uploadTask}) => {

    // const {uploadTodo} = useTodos()
    const [isCompleted, setCompleted] = useState(false)
    const [title, setTitle] = useState('')

    const debouncedUploadTodo = debounce(() => uploadTask(isCompleted,title),1000)


    const handleAddTask = async () => {
        await debouncedUploadTodo();
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
            <button onClick={handleAddTask}>Add</button>
        </div>
    )
};
