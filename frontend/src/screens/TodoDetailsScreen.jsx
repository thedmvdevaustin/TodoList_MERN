import { useParams, useNavigate } from 'react-router-dom'
import { useGetTodoByIdQuery, useDeleteTodoMutation, useMarkCompleteMutation, useUnMarkCompleteMutation } from '../slices/todosApiSlice'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons"
import { toast } from 'react-toastify' 

const TodoDetailsScreen = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data = []} = useGetTodoByIdQuery(id)

    const [deleteTodo, { isLoading}] = useDeleteTodoMutation()
    const [markcomplete] = useMarkCompleteMutation()
    const [markInComplete] = useUnMarkCompleteMutation()

    const handleDelete = (todoId) => {
        if (window.confirm('Are you sure')){
            deleteTodo(todoId)
            toast.success("Deleted Todo")
            navigate('/dashboard')
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

    return (
        <div className="todoDetails-container">
            <h2>More Details</h2>
            <section className="todoDetails">
                <div className="todo">
                    <Link to="/dashboard"><h4>{data && data.todo}</h4></Link>
                    <div className="todos-container-buttons">
                        <button type="button" onClick={() => handleDelete(data._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        {data.isCompleted ? 
                        <button type="button" onClick={() => handleUnMarkComplete(data._id)}><FontAwesomeIcon icon={faSquareCheck} /></button> : 
                        <button type="button" id="faSquare" onClick={() => handleMarkComplete(data._id)}><FontAwesomeIcon icon={faSquare} /></button>}
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