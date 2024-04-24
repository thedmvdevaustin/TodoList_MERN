import express from 'express'
import { getTodos, getTodoById, createTodo, updateTodo, updateMarkCompleted, updateMarkNotCompleted, deleteTodo } from '../controllers/todosController.js'
import { protect } from '../middleware/authMiddleware.js'
const routes = express.Router()

routes.get('/', protect, getTodos)
routes.get('/:id', protect, getTodoById)
routes.post('/newTodo', protect, createTodo)
routes.put('/update/:id', protect, updateTodo)
routes.put('/mark/:id',protect, updateMarkCompleted)
routes.put('/unMark/:id',protect, updateMarkNotCompleted)
routes.delete('/:id', protect, deleteTodo)

export default routes