import Todo from '../models/todoModel.js'
import asyncHandler from 'express-async-handler'

const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({user: req.user._id})
    res.status(200).json(todos)
})

const getTodoById = asyncHandler(async(req, res) => {
    if (!req.params.id){
        res.status(404)
    } else {
        const todo = await Todo.findById(req.params.id)
        if (!todo){
            res.status(400)
            throw new Error("Todo does not exist")
        } else{
            res.status(200).json({
                _id: req.params.id,
                todo: todo.todo,
                isCompleted: todo.isCompleted,
                createdAt: todo.createdAt,
                updatedAt: todo.updatedAt
            })
        }
    }
})

const createTodo = asyncHandler(async (req, res) => {
    const { todo } = req.body
    if (todo){
        const newTodo = await Todo.create({todo: todo, user: req.user._id})
        res.status(201).json({
            _id: newTodo._id,
            todo: newTodo.todo,
            isCompleted: newTodo.isCompleted
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

const updateTodo = asyncHandler(async (req, res) => {
    if (!req.params.id){
        res.status(404)
    }
    const { todo } = req.body
    if (!todo){
        res.status(400)
        throw new Error("Invalid Data")
    } else {
        const newTodo = await Todo.findByIdAndUpdate({_id: req.params.id}, {
            todo: todo,
        })
        res.status(200).json(newTodo)
    }
})

const updateMarkCompleted = asyncHandler(async (req, res) => {
    if (!req.params.id){
        res.status(404)
    } else {
        const newTodo = await Todo.findByIdAndUpdate({_id: req.params.id}, {
            isCompleted: true
        })
        res.status(200).json(newTodo)
    }
})

const updateMarkNotCompleted = asyncHandler(async (req, res) => {
    if (!req.params.id){
        res.status(404)
    } else {
        const newTodo = await Todo.findByIdAndUpdate({_id: req.params.id}, {
            isCompleted: false
        })
        res.status(200).json(newTodo)
    }
})

const deleteTodo = asyncHandler(async (req, res) => {
    if (!req.params.id){
        res.status(404)
    } else {
        await Todo.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({message: "Todo Deleted"})
    }
})

export {getTodos, getTodoById, createTodo, updateTodo, updateMarkCompleted, updateMarkNotCompleted, deleteTodo}