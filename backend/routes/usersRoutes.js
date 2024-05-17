import express from 'express'
import { registerUser, loginUser, logoutUser, updateUser } from '../controllers/usersController.js'
import { protect } from '../middleware/authMiddleware.js'
const routes = express.Router()

routes.post('/register', registerUser)
routes.post('/login', loginUser)
routes.post('/logout', logoutUser)
//add a route for the update profile controller function
routes.put('/update', protect,  updateUser )
export default routes