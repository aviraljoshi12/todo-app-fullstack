import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo }),
    });

    const createdTodo = await res.json();
    setTodos((prev) => [...prev, createdTodo]);

    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (todo) => {
    const res = await fetch(`http://localhost:4000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const updated = await res.json();

    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated.todo : t)));
  };

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
