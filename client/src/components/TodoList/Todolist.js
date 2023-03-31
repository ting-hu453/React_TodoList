import React, { useEffect, useState } from "react";
import axios from "axios";
import "./todolist.css";

const availableStatuses = {
  0: "To-do",
  1: "In-Progress",
  2: "Completed",
};
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("/tasks").then((response) => setTasks(response.data));
  };

  const postData = (data) => {
    axios
      .post("/tasks", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putData = (id, data) => {
    axios
      .put(`/tasks/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = (id) => {
    axios
      .delete(`/tasks/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    setInputTask(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputTask.length === 0) return;
    if (edit === null) {
      setTasks((prev) => [...prev, { title: inputTask, status: 0 }]);
      postData({ title: inputTask, status: 0 });
      fetchData();
    } else {
      let currentIndex = tasks.findIndex((element) => element.id === edit);
      tasks[currentIndex].title = inputTask;
      putData(edit, {
        title: inputTask,
        status: tasks[currentIndex].status,
      });
      setEdit(null);
    }
    setInputTask("");
  };

  const handleStatus = (id, index, taskStatus) => {
    const updatedStatus = (taskStatus + 1) % 3;
    const updatedTasks = [...tasks];
    const updatedTask = { ...updatedTasks[index], status: updatedStatus };
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    putData(id, {
      title: tasks[index].title,
      status: updatedStatus,
    });
  };
  const handleEdit = (id) => {
    tasks.find((task) => {
      if (task.id === id) {
        setInputTask(task.title);
        setEdit(id);
      }
    });
  };
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    deleteData(id);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 todolist">My Todo List</h2>
      <div className="d-flex">
        <input
          type="text"
          placeholder="Enter task"
          className="form-control"
          value={inputTask}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit} className="btn btn-primary btn-submit">
          Submit
        </button>
      </div>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Task
            </th>
            <th scope="col" className="text-center">
              Status
            </th>
            <th scope="col" className="text-center">
              Edit
            </th>
            <th scope="col" className="text-center">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={task.id}>
                <td className="text-center">
                  <span className={task.status === 2 ? `completed` : ``}>
                    {task.title}
                  </span>
                </td>
                <td className="text-center" style={{ width: `150px` }}>
                  <span
                    className="status"
                    onClick={() => handleStatus(task.id, index, task.status)}>
                    {availableStatuses[task.status]}
                  </span>
                </td>
                <td className="text-center">
                  {" "}
                  <div onClick={() => handleEdit(task.id)}>
                    {" "}
                    <span className="fa fa-pen"></span>
                  </div>
                </td>
                <td className="text-center">
                  <div onClick={() => handleDelete(task.id)}>
                    <span className="fa fa-trash"></span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
