import { useParams, useNavigate } from 'react-router-dom'
import { useGetTodoByIdQuery, useDeleteTodoMutation } from '../slices/todosApiSlice'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons"
import { toast } from 'react-toastify' 

const TodoDetailsScreen = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data = []} = useGetTodoByIdQuery(id)

    const [deleteTodo, { isLoading}] = useDeleteTodoMutation()

    const handleDelete = (todoId) => {
        if (window.confirm('Are you sure')){
            deleteTodo(todoId)
            toast("Deleted Todo")
            navigate('/dashboard')
        }
    }
    return (
        <div className="todoDetails-container">
            <h2>More Details</h2>
            <section className="todoDetails">
                <div className="todo">
                    <Link to="/dashboard"><h4>{data && data.todo}</h4></Link>
                    <div className="todos-container-buttons">
                        <button type="button" onClick={() => handleDelete(data._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
                <span>This specific todo is {data.isCompleted ? "completed" : "not completed"}</span>
                <p>This Todo was created on {dateFormat(data.createdAt, "dddd, mmmm, dS, yyyy")}</p>
                <p>This Todo was updated on {dateFormat(data.updatedAt, 'dddd, mmmm, dS, yyyy')}</p>
                <Link to='/dashboard'>Back To Dashboard</Link>
            </section>
        </div>
    )
}

export default TodoDetailsScreen