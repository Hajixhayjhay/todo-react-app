const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const dataFilePath = path.join(__dirname, 'db.json')

class Task {
    constructor(id, title, completed) {
        this.id = id;
        this.completed = completed;
        this.title = title;
    }
}

const getTasksFromDB = async () => {
    try {
        const data = await fs.promises.readFile(dataFilePath, 'utf8')
        return JSON.parse(data).tasks
    } catch (error) {
        return {error: error.message}
    }
}

const createTaskInDB = async (taskData) => {

    try {
        const data = await fs.promises.readFile(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        const taskID = uuid.v4()
        const task = {
            ...taskData, id: taskID
        }

        jsonData.tasks.push(task)
        await fs.promises.writeFile(dataFilePath, JSON.stringify(jsonData))

        return task
    } catch (error) {
        return {error: error.message}
    }
}

const updateTaskInDB = async (id, task) => {
    try {
        const data = await fs.promises.readFile(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        const taskIndex = jsonData.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return {err: "Task not found"};
        }

        const updatedTask = {...jsonData.tasks[taskIndex], ...task};
        jsonData.tasks[taskIndex] = updatedTask;

        await fs.promises.writeFile(dataFilePath, JSON.stringify(jsonData));
        return updatedTask;
    } catch (error) {
        console.error("Error updating task in JSON file.");
        return {err: error.message};
    }
}

const getTaskbyIdInDB = async (id) => {
    try {
        const data = await fs.promises.readFile(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.tasks.find(task => task.id === id)
    } catch (error) {
        return {err: error.message}
    }
}

const deleteTaskInDB = async (id) => {
    try {
        const data = await fs.promises.readFile(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        // console.log(id)
        const taskIndex = jsonData.tasks.findIndex(task => task.id === id)

        console.log(taskIndex)
        if (taskIndex === -1) {
            return {err: "Task not found"}

        }
        jsonData.tasks.splice(taskIndex, 1)
        await fs.promises.writeFile(dataFilePath, JSON.stringify(jsonData));
        return taskIndex
    } catch (error) {
        return {err: error.message}
    }
}

module.exports = {
    Task,
    getTasksFromDB,
    // getTaskbyIdInDB,
    createTaskInDB,
    updateTaskInDB,
    deleteTaskInDB
}


