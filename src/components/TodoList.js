import React from 'react';
import TodoItem from "./TodoItem";
import {useTodos} from "../hooks/useTodos";

export const TodoList = () => {

    const {
        todos,
        errorTodos,
        isLoadingTodos,
        updateTodo,
        updatingId,
        errorRemovingTodo,
        removingId,
        completeTodo,
        errorEditingTodo,
        editingId,
        editTodo,
        removeTodo
    } = useTodos()

    if (isLoadingTodos) {
        return <span>Is Loading</span>
    }

    if (errorTodos) {
        return <span>error</span>
    }

    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo.id}>
                    <TodoItem
                        todoItem={todo}
                        onUpdate={(title) => updateTodo(todo.id, title)}
                        loading={updatingId === todo.id || removingId === todo.id}
                        onRemove={() => removeTodo(todo.id)}
                        onCompleted={(checked) => completeTodo(todo.id,checked)}
                        // errorRemovingTodo={errorRemovingTodo}
                        // onEdit={(id,title,completed) => editTodo(id, title, completed)}
                        // onRemove={() => removeTodo(todo.id)}
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


