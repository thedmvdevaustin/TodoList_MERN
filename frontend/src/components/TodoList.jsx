import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSquare, faSquareCheck, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetTodosQuery, useDeleteTodoMutation, completedTodosSelector, inCompletedTodosSelector, useMarkCompleteMutation, useUnMarkCompleteMutation } from '../slices/todosApiSlice'
import { useState } from 'react'

const TodoList = () => {
    //Make sure to initialize your query calls to an empty array or 
    //data type equivalent or else the page will break; the page renders before
    //the api completes the req/res cycle so it will return undefined causing
    //the page to break
    const { data = [] } = useGetTodosQuery()
    const [deleteTodo, { isLoading}] = useDeleteTodoMutation()
    const [markcomplete] = useMarkCompleteMutation()
    const [markInComplete] = useUnMarkCompleteMutation()

    const completedTodos = useSelector(completedTodosSelector)
    const inCompletedTodos = useSelector(inCompletedTodosSelector)

    const [completedSelected, setCompletedSelected] = useState(false)
    
    const handleDelete = (todoId) => {
        if (window.confirm('Are you sure')){
            deleteTodo(todoId)
            toast.success("Deleted Todo")

        }
    }

    const handleMarkComplete = (todoId) => {
        markcomplete(todoId)
        toast.success("Completed Todo")
    }

    const handleUnMarkComplete = (todoId) => {
        markInComplete(todoId)
        toast("Todo Marked Incomplete")
    }

    const changeToCompleted = e => {
        e.preventDefault()
        setCompletedSelected(true)
    }
    const changeToInCompleted = e => {
        e.preventDefault()
        setCompletedSelected(false)
    }
    const showInCompletedTodos = 
            <ul className="todos-container">
                {inCompletedTodos && inCompletedTodos.map((todo, index) => <li className="todo" key={todo._id}>
                    <Link to={`/${todo._id}`}><h4>{todo.todo}</h4></Link>
                    <div className="todos-container-buttons">
                        <button type="button" onClick={() => handleDelete(todo._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <button type="button" id="faSquare" onClick={() => handleMarkComplete(todo._id)}><FontAwesomeIcon icon={faSquare} /></button>
                    </div>
                </li>)}
            </ul>

    const showCompletedTodos = 
            <ul className="todos-container">
                {completedTodos && completedTodos.map((todo, index) => <li className="todo" key={todo._id}>
                    <Link to={`/${todo._id}`}><h4>{todo.todo}</h4></Link>
                    <div className="todos-container-buttons">
                        <button type="button" onClick={() => handleDelete(todo._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <button type="button" onClick={() => handleUnMarkComplete(todo._id)}><FontAwesomeIcon icon={faSquareCheck} /></button>
                    </div>
                </li>)}
            </ul>

    return (
        <div className="todoListContainer">
            <div className="completed-container">
                <button onClick={changeToInCompleted} className={!completedSelected ? 'active' : 'not-active'}>To do</button>
                <button onClick={changeToCompleted}  className={completedSelected ? 'active' : 'not-active'}>Completed</button>
            </div>
            {completedSelected ? showCompletedTodos : showInCompletedTodos}
        </div>
    )
}

export default TodoList