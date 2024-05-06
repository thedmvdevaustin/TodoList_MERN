import { useState } from 'react'


const TodoListForm = () => {
    const [title, setTitle] = useState("")

    const handleTitle = e => {
        setTitle(e.target.default)
    }
    return (
        <form className="form-container">
            <div className="form-input-container">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" onChange={setTitle} value={title} />
            </div>
            <div className="form-input-button">
                <button >Add</button>
            </div>
        </form>
    )
}

export default TodoListForm