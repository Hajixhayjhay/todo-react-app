const {
    Task,
    getTasksFromDB,
    // getTaskbyIdInDB,
    createTaskInDB,
    updateTaskInDB,
    deleteTaskInDB
} = require('../model/task')


const getTasks = async (req, res) => {
    const result = await getTasksFromDB();
    res.status(result.err ? 500 : 200).json(result);
}

const createTask = async (req, res) => {
    const task = req.body;
    console.log(JSON.stringify(task))
    const result = await createTaskInDB(task)
    res.status(result.err ? 500 : 201).json(result);
}

const updateTask = async (req, res) => {
    const id = req.params.id;
    const task = req.body;
    const result = await updateTaskInDB(id, task);
    res.status(result.err ? 500 : 201).json(result);
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    const result = await deleteTaskInDB(id);
    res.status(result.err ? 500 : 200).json(result);
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}