import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoutes from './routes/usersRoutes.js'
import todosRoutes from './routes/todosRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/users', userRoutes )
app.use('/profile', todosRoutes )

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)})