
# Todo list - React - Full stack

This repository contains a full stack Todo List application built using React on the front-end and Node.js with Express on the back-end. The application allows users to create, update, and delete tasks in a simple and intuitive manner.

## Add a task
<p align="center">
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/1.jpg" width="450" height="170"/>
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/2.jpg" width="450" height="170"/>
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/3.jpg" width="450" height="170"/>
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/4.jpg" width="450" height="170"/>
</p>


## Edit task
<p align="center">
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/5.jpg" width="450" height="170"/>
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/6.jpg" width="450" height="170"/>
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/7.jpg" width="450" height="170"/>
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/8.jpg" width="450" height="170"/>
</p>

## Delete task
<p align="center">
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/9.jpg" width="450" height="170"/>
  <img src="https://github.com/Asnvir/todo-react-app/blob/main/images/10.jpg" width="450" height="170"/>
</p>

## File structure
```

|-- backend
|   |-- constants.js
|   |-- controllers
|   |   `-- taskController.js
|   |-- model
|   |   |-- db.json
|   |   `-- task.js
|   |-- routes
|   |   `-- tasks.js
|   `-- server.js


|-- frontend
|   |-- README.md
|   `-- src
|       |-- App.css
|       |-- App.js
|       |-- components
|       |   |-- Spinner.js
|       |   |-- TaskForm.js
|       |   |-- TaskHeader.js
|       |   |-- TaskItem.js
|       |   |-- TaskProvider.js
|       |   |-- TasksList.js
|       |   `-- TasksManager.js
|       |-- contexts.js
|       |-- hooks
|       |   |-- useAddTask.js
|       |   |-- useGetTasks.js
|       |   |-- useTask.js
|       |   `-- useTasks.js
|       |-- index.css
|       |-- index.js
|       |-- reportWebVitals.js
|       `-- services
|           |-- index.js
|           `-- TasksService.js
`-- README.md


```

## Features
- Create new tasks with a title and description.
- Mark tasks as completed.
- Update task details.
- Delete tasks.

## Front-end
- React: A JavaScript library for building user interfaces.
- Custom Hooks: Custom React hooks to encapsulate and reuse logic.
- HTML5 and CSS3: Markup and styling for the user interface.
- Axios: A promise-based HTTP client for making API requests.

## Back-end

- Node.js: A JavaScript runtime environment.
- Express: A minimal and flexible web application framework for Node.js.
