const fs = require("fs");
const path = require("path");

function createTask(body, tasksArray) {
  const newTask = body;
  tasksArray.push(newTask);
  fs.writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify({ tasks: tasksArray }, null, 2)
  );

  return newTask;
}

function deleteTask(body, tasksArray) {
  tasksArray = tasksArray.filter((task) => task.id !== body);
  fs.writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify({ tasks: tasksArray }, null, 2)
  );

  return tasksArray;
}

function updateTask(request, tasksArray) {
  let index = tasksArray.findIndex((task) => task.id === request.params.id);
  tasksArray[index] = { ...tasksArray[index], ...request.body };

  fs.writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify({ tasks: tasksArray }, null, 2)
  );

  return tasksArray;
}

module.exports = { createTask, deleteTask, updateTask };
