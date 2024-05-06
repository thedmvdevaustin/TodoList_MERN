import TodoListForm from '../components/TodoListForm'
import TodoList from '../components/TodoList'

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <section className="todoList-container">
                <TodoListForm />
                <TodoList />
            </section>
        </div>

    )
}

export default Dashboard