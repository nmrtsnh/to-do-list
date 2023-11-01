import { useState, useRef, useEffect } from "react";
import Form from "./Form";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTasks, setShowTasks] = useState(true);
  const [viewHistory, setViewHistory] = useState(false);

  const confirmationRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handClickOutside(event) {
    if (
      confirmationRef.current &&
      !confirmationRef.current.contains(event.target)
    ) {
      setShowConfirmation(false);
    }
  }

  useEffect(() => {
    if (showConfirmation) {
      document.addEventListener("mousedown", handClickOutside);
    } else {
      document.removeEventListener("mousedown", handClickOutside);
    }
  });

  function handleAddTask(newTodo) {
    const todoWithId = { ...newTodo, id: uuidv4(), done: false };
    const updatedTodos = [...todos, todoWithId];
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  }

  function handleDeleteTask(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function handleToggleTask(id, show) {
    // setShowTasks(show);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }
  function handleClearAllTasks() {
    if (todos.length > 0) {
      setShowConfirmation(true);
    }
  }

  function handleConfirmation(answer) {
    setShowConfirmation(false);
    if (answer === "yes") {
      setTodos([]);
    }
  }

  function handleShowHistory() {
    setViewHistory(true);
  }

  function handleShowTasks() {
    setViewHistory(false);
  }

  const filteredTodos = viewHistory ? todos.filter((todo) => todo.done) : todos;

  return (
    <div className="app-container">
      <div className={`heading ${showConfirmation ? "blurred" : ""}`}>
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
              <div className={`sidebar ${showConfirmation ? "blurred" : ""}`}>
                <div
                  className="task-bar"
                  onClick={() => setShowTasks(!showTasks)}
                >
                  <img className="task-img" src="task.png" alt="Task" />
                  <span className="text-2" onClick={handleShowTasks}>
                    Tasks
                  </span>
                </div>
                <div className="history-bar">
                  <img
                    className="history-img"
                    src="history.png"
                    alt="History"
                  />
                  <span className="text-2" onClick={handleShowHistory}>
                    History
                  </span>
                </div>
              </div>
            </div>

            <div className="input-bar">
              <div
                className={`form-section ${showConfirmation ? "blurred" : ""}`}
              >
                <Form onAddTasks={handleAddTask} />
              </div>
              <div className="tasks-section">
                {filteredTodos.length === 0 ? (
                  <span className="text-3">There is no task for today!</span>
                ) : (
                  <ul>
                    {filteredTodos.map((todo) => (
                      <li
                        className={`task-list ${
                          showConfirmation ? "blurred" : ""
                        }`}
                        key={todo.id}
                      >
                        <input
                          type="checkbox"
                          checked={todo.done}
                          onChange={() => handleToggleTask(todo.id)}
                        />
                        <span
                          style={
                            todo.done ? { textDecoration: "line-through" } : {}
                          }
                        >
                          {todo.tasks}
                        </span>
                        <button onClick={() => handleDeleteTask(todo.id)}>
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <button
                  className={`button clear-btn ${
                    showConfirmation ? "blurred" : ""
                  }`}
                  onClick={handleClearAllTasks}
                  disabled={todos.length === 0}
                >
                  Clear all tasks
                </button>
              </div>
              {showConfirmation && (
                <div className="modal-background">
                  <div className="confirmation-modal" ref={confirmationRef}>
                    <h3 className="clear">Clear All Tasks</h3>
                    <p>Are you sure you want to clear all tasks?</p>
                    <div className="confirmation-btn">
                      <button
                        className="no-btn confirm-btn"
                        onClick={() => handleConfirmation("no")}
                      >
                        No
                      </button>
                      <button
                        className="yes-btn confirm-btn"
                        onClick={() => handleConfirmation("yes")}
                      >
                        Yes
                      </button>
                      <button
                        className="no-btn confirm-btn"
                        onClick={() => handleConfirmation("no")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
