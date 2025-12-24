import express from "express";
import cors from "cors";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

let todos = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
  },
  {
    id: 2,
    title: "Learn React Hooks",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  console.log(title);

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }
  const newTodo = {
    id: Date.now(),
    title: title,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  const deletedTodo = todos[index];

  todos.splice(index, 1);

  res.json({
    message: "Todo deleted successfully",
    deletedTodo,
  });
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  if (typeof title === "string" && title.trim() !== "") {
    todo.title = title;
  }

  if (typeof completed === "boolean") {
    todo.completed = completed;
  }

  res.json({
    message: "Todo updated successfully",
    todo,
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
