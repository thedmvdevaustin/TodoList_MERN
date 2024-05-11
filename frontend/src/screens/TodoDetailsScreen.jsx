import { useParams } from 'react-router-dom'
import { useGetTodoByIdQuery } from '../slices/todosApiSlice'
import { Link } from 'react-router-dom'

const TodoDetailsScreen = () => {
    const { id } = useParams()
    const { data = []} = useGetTodoByIdQuery(id)
    console.log(data)
    return (
        <div className="todoDetails-container">
            <section className="todoDetails">
                <h4>{data && data.todo}</h4>
                <span>This specific todo is {data.isCompleted ? "completed" : "not completed"}</span>
                <p>This Todo was created at {data.createdAt}</p>
                <p>This Todo was updated at {data.updatedAt}</p>
                <Link to='/dashboard'>Back To Dashboard</Link>
            </section>
        </div>
    )
}

export default TodoDetailsScreen