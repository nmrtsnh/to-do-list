import { useState } from "react";
import Form from "./Form";

export default function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTask(newTodo) {
    setTodos((prevTodos) => [...todos, newTodo]);
  }

  function handleDeleteTask(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }
  return (
    <div>
      <div className="heading">
        <img src="img-todo-list.png" alt="todo list"></img>
        <div className="text">
          <h1>TODO LIST</h1>
          <p className="text-1">Create Your List</p>
        </div>
      </div>

      <div className="card">
        <section className="main">
          <div className="main-app">
            <div className="text-bar">
              <div className="sidebar">
                <div className="task-bar">
                  <img className="task-img" src="task.png" alt="Task" />
                  <span className="text-2">Tasks</span>
                </div>
                <div className="history-bar">
                  <img
                    className="history-img"
                    src="history.png"
                    alt="History"
                  />
                  <span className="text-2">History</span>
                </div>
              </div>
            </div>

            <div className="input-bar">
              <div className="form-section">
                <Form onAddTasks={handleAddTask} />
              </div>
              <div className="tasks-section">
                {todos.length === 0 ? (
                  <span className="text-3">There is no task for today</span>
                ) : (
                  <ul>
                    {todos.map((todo) => (
                      <li className="task-list" key={todo.id}>
                        {todo.tasks}
                        <button onCLick={() => handleDeleteTask(todo.id)}>
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
