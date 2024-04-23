

const getTodos = async (req, res) => {
    res.status(200).json({message: "Todos"})
}

const createTodo = async (req, res) => {
    res.status(201).json({message: "Created Todo"})
}

const updateTodo = async (req, res) => {
    res.status(200).json({message: "Updated Todo"})
}

const updateMarkCompleted =async (req, res) => {
    res.status(200).json({message: "Todo marked Completed"})
}

const updateMarkNotCompleted = async (req, res) => {
    res.status(200).json({message: "Todo marked unCompleted"})
}

const deleteTodo = async (req, res) => {
    res.status(200).json({message: "Todo Deleted"})
}

export {getTodos, createTodo, updateTodo, updateMarkCompleted, updateMarkNotCompleted, deleteTodo}