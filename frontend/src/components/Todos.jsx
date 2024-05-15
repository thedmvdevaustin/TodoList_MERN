import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons"
import { useGetTodosQuery, useDeleteTodoMutation } from '../slices/todosApiSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const Todos = () => {
    //Make sure to initialize your query calls to an empty array or 
    //data type equivalent or else the page will break; the page renders before
    //the api completes the req/res cycle so it will return undefined causing
    //the page to break
    const { data = [] } = useGetTodosQuery()
    const [deleteTodo, { isLoading}] = useDeleteTodoMutation()

    const handleDelete = (todoId) => {
        if (window.confirm('Are you sure')){
            deleteTodo(todoId)
            toast("Deleted Todo")

        }
    }
    return (
        <ul className="todos-container">
            {data && data.map((todo, index) => <li className="todo" key={todo._id}>
                <Link to={`/${todo._id}`}><h4>{todo.todo}</h4></Link>
                <div className="todos-container-buttons">
                    <button type="button" onClick={() => handleDelete(todo._id)}><FontAwesomeIcon icon={faTrash} /></button>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </li>)}
        </ul>
        
    )
}

export default Todos