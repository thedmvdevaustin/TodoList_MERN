import mongoose from 'mongoose'

const todosSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    todo: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Todo = new mongoose.model('Todo', todosSchema)

export default Todo