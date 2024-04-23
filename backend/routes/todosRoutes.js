import express from 'express'
import { getTodos, createTodo, updateTodo, updateMarkCompleted, updateMarkNotCompleted, deleteTodo } from '../controllers/todosController.js'
const routes = express.Router()

routes.get('/', getTodos)
routes.post('/newTodo', createTodo)
routes.put('/update', updateTodo)
routes.route('/').put(updateMarkCompleted).put(updateMarkNotCompleted)
routes.delete('/', deleteTodo)

export default routes