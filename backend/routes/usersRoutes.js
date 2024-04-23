import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/usersController.js'
const routes = express.Router()

routes.post('/register', registerUser)
routes.post('/login', loginUser)
routes.post('/logout', logoutUser)

export default routes