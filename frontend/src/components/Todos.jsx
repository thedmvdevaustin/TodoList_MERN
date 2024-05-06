import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons"


const Todos = () => {
    const todos = ["Doing Workout", "Writing diary"]

    return (
        <ul className="todos-container">
            {todos.map((todo, index) => <li className="todo" key={index}>
                <h4>{todo}</h4>
                <div className="todos-container-buttons">
                    <FontAwesomeIcon icon={faTrash} />
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </li>)}
        </ul>
    )
}

export default Todos