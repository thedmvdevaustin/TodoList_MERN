import express from 'express'
import { getTodos, createTodo, updateTodo, updateMarkCompleted, updateMarkNotCompleted, deleteTodo } from '../controllers/todosController.js'
import { protect } from '../middleware/authMiddleware.js'
const routes = express.Router()

routes.get('/', protect, getTodos)
routes.post('/newTodo', protect, createTodo)
routes.put('/update', protect, updateTodo)
routes.route('/').put(protect, updateMarkCompleted).put(protect, updateMarkNotCompleted)
routes.delete('/', protect, deleteTodo)

export default routes