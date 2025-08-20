import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:5000/api/todos";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task) return;
    await axios.post(API, { task });
    setTask("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const updateTodo = async (id) => {
    const newTask = prompt("Enter new task:");
    if (!newTask) return;
    await axios.put(`${API}/${id}`, { task: newTask });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <input
        value={task}
        placeholder="Enter a task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="add-btn" onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <div>
              <button className="update-btn" onClick={() => updateTodo(todo.id)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
