import { useState } from 'react'
import { useAddTodoMutation } from '../slices/todosApiSlice'
import { toast } from 'react-toastify'


const TodoListForm = () => {
    const [title, setTitle] = useState("")

    const [addTodo, { isLoading }] = useAddTodoMutation()

    const handleTitle = e => {
        setTitle(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await addTodo({ todo: title })
        setTitle("")
        toast("New Todo added!")
    }
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-input-container">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" onChange={handleTitle} value={title} />
            </div>
            <div className="form-input-button">
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default TodoListForm