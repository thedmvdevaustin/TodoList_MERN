import Todos from './Todos'

const TodoList = () => {
    return (
        <div className="todoListContainer">
            <div className="completed-container">
                <span className="not-completed">To Do</span>
                <span className="completed">Completed</span>
            </div>
            <Todos />
        </div>
    )
}

export default TodoList