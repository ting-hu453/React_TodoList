const express = require("express");
const app = express();
app.use(express.json());
const { v4: uuidv4 } = require("uuid");
const { tasks } = require("./data/db.json");
const { createTask, deleteTask, updateTask } = require("./lib/db.js");

const PORT = process.env.PORT || 4000;

app.get("/tasks", (request, response) => {
  let results = tasks;
  response.json(results);
});

app.post("/tasks", (request, response) => {
  let _id = uuidv4();
  request.body.id = _id;
  const newTask = createTask(request.body, tasks);
  response.json(newTask);
});

app.delete("/tasks/:id", (request, response) => {
  const tasksAfterDelete = deleteTask(request.params.id, tasks);
  response.json(tasksAfterDelete);
});

app.put("/tasks/:id", (request, response) => {
  const taskAfterUpdate = updateTask(request, tasks);
  response.json(taskAfterUpdate);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
