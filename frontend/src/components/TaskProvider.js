import {useEffect, useReducer} from "react";
import {TasksContext} from "../contexts";

//state = { tasks : [], foo: bar }
const taskReducer = (state, {type, payload}) => {
    switch (type) {
        case 'ADD_TASK':
            return {...state, tasks: [...state.tasks, payload]}
        case 'REMOVE_TASK':
            return {...state, tasks: state.tasks.filter(task => task.id !== payload)}
        case 'UPDATE_TASK':
            // return {
            //     ...state, tasks: state.tasks.map(task => task.id === payload.id ? payload : task)
            // }
        {
            const updatedTasks = state.tasks.map(task => task.id === payload.id ? payload : task)
            return {...state, tasks: updatedTasks}
        }
        case 'SET_TASKS':
            return {...state, tasks: payload}
        default: {
            throw Error('Unknown action: ' + type);
        }
    }
}


export const TaskProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, {tasks: [], foo: 'bar'})


    return (
        <TasksContext.Provider value={{tasks: state.tasks, dispatch}}>
            {children}
        </TasksContext.Provider>
    )
}