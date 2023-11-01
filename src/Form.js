import { useState } from "react";

export default function Form({ onAddTasks }) {
  const [tasks, setTasks] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!tasks) return;

    const newTasks = { tasks };
    console.log(newTasks);

    onAddTasks(newTasks);

    setTasks("");
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-data"
        placeholder="Enter your task"
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}
