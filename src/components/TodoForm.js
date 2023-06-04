import React, {useState} from "react";

import {debounce} from "lodash";


export const TodoForm = () => {

    // const {uploadTodo} = useTodos()
    const [isCompleted, setCompleted] = useState(false)
    const [title, setTitle] = useState('')

    // const debouncedUploadTodo = debounce(() => uploadTodo(isCompleted,title),1000)


    const handleAddTodo = async () => {
        // await debouncedUploadTodo();
        console.log('debouncedUploadTodo finished')
        setCompleted(false);
        console.log('setCompleted(false);')
        setTitle('');
        console.log('setTitle(\'\');')
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
            <button onClick={handleAddTodo}>Add</button>
        </div>
    )
};
