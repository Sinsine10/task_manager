import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000/tasks";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (id: string) => {
    await axios.patch(`${API_URL}/${id}/status`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="add-task">
        <input
          type="text"
          value={title}
          placeholder="Task title..."
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="add-task">
        <input
          type="text"
          value={description}
          placeholder="Task description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.status === "done" ? "done" : ""}>
            <div className="task-info">
              <strong>{task.title}</strong>
              {task.description && <p>{task.description}</p>}
            </div>

            <div className="task-buttons">
              <button
                className="toggle-btn"
                onClick={() => toggleStatus(task.id)}
              >
                {task.status === "done" ? "Undo" : "Done"}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
