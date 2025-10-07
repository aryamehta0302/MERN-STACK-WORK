import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // 🧠 Load from LocalStorage on first render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // 💾 Save to LocalStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ➕ Add or ✏️ Update Todo
  const addOrUpdateTodo = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      // Update existing todo
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: task } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new todo
      setTodos([...todos, { text: task, completed: false }]);
    }
    setTask("");
  };

  // 🗑️ Delete
  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  // ✅ Toggle complete
  const toggleComplete = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  // ✏️ Edit
  const editTodo = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>📝 React Todo App (with Edit & LocalStorage)</h1>

      {/* Input Field */}
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addOrUpdateTodo}
          style={{
            padding: "10px 20px",
            backgroundColor: editIndex !== null ? "#FF9800" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Todo List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <span
              onClick={() => toggleComplete(index)}
              style={{ cursor: "pointer", flex: 1, textAlign: "left" }}
            >
              {todo.text}
            </span>

            <div>
              <button
                onClick={() => editTodo(index)}
                style={{
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(index)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ color: "#888", marginTop: "20px" }}>No tasks added yet.</p>
      )}
    </div>
  );
}

export default App;
