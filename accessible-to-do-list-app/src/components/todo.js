import React, { useState, useEffect } from "react";
import "./todo.css";

export default function Todo() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [historyButton, setHistoryButton] = useState(false);
  const [historyTask, setHistoryTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todo-list"));
    if (savedTasks) {
      setList(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);

  // Daily reset mechanism
  useEffect(() => {
    const now = new Date();
    const resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeout = resetTime - now;

    const resetDailyCompletedDates = () => {
      setList((prevList) =>
        prevList.map((task) => ({
          ...task,
          status: { ...task.status, completedDate: null },
        }))
      );
    };

    const timer = setTimeout(() => {
      resetDailyCompletedDates();
    }, timeout);

    return () => clearTimeout(timer);
  }, [list]);

  const handleChange = (e) => setTask(e.target.value);
  const handleDateChange = (e) => setTaskDate(e.target.value);
  const handleTimeChange = (e) => setTaskTime(e.target.value);

  const handleClick = () => {
    if (task.trim() !== "") {
      setList([
        ...list,
        {
          name: task,
          date: taskDate,
          time: taskTime,
          status: {
            state: false,
            completedDate: null,
            history: [],
          },
        },
      ]);
      setTask("");
      setTaskDate("");
      setTaskTime("");
    }
  };

  const deleteTask = (deleteIndex) => {
    setList(list.filter((_, index) => index !== deleteIndex));
  };

  const handleCheckbox = (index) => {
    const updatedList = list.map((task, i) =>
      i === index
        ? {
            ...task,
            status: {
              ...task.status,
              state: !task.status.state,
              completedDate: !task.status.state ? new Date().toLocaleString() : null,
              history: !task.status.state
                ? [...task.status.history, new Date().toLocaleString()]
                : task.status.history,
            },
          }
        : task
    );
    setList(updatedList);
  };

  const startEdit = (index) => {
    setEditTask(index);
    setEditedValue(list[index].name);
  };

  const cancelEdit = () => setEditTask(null);

  const saveEdit = (index) => {
    setList(list.map((task, i) => (i === index ? { ...task, name: editedValue } : task)));
    setEditTask(null);
  };

  const handleEditChange = (e) => setEditedValue(e.target.value);

  const filterTasks = () => {
    if (filter === "completed") {
      return list.filter((task) => task.status.state);
    } else if (filter === "not-completed") {
      return list.filter((task) => !task.status.state);
    }
    return list;
  };

  const filteredTasks = filterTasks();

  const showHistoryDetails = (index) => {
    setHistoryTask(list[index]);
  };

  return (
    <div className="todo-container">
      <div className="tabsFeel">
        <button className="tab" onClick={() => setFilter("all")}>All Tasks</button>
        <button className="tab" onClick={() => setFilter("completed")}>Completed Tasks</button>
        <button className="tab" onClick={() => setFilter("not-completed")}>Not Completed Tasks</button>
        <button className="tab" onClick={() => setHistoryButton(!historyButton)}>History</button>
      </div>

      <div className="text">
        <h2>Todo List App</h2>
        <p>Your one-stop destination for managing your daily tasks</p>
      </div>

      {historyButton && (
        <div className="history-section">
          <h3>Task History</h3>
          {list.map((task, index) =>
            task.status.history.length > 0 ? (
              <div key={index} onClick={() => showHistoryDetails(index)} className="history-item">
                {task.name}
              </div>
            ) : null
          )}
          {historyTask && (
            <div className="history-details">
              <h4>{historyTask.name} History</h4>
              {historyTask.status.history.map((date, idx) => (
                <p key={idx}>Completed on: {date}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="todo-task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <section key={index} className="todo-task">
              {editTask === index ? (
                <>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(index)} className="save-button">Save</button>
                  <button onClick={cancelEdit} className="cancel-button">Cancel</button>
                </>
              ) : (
                <>
                  <p className={`task-name ${task.status.state ? "completed" : ""}`}>
                    {task.name} <hr /> {task.date} <hr /> {task.time}
                  </p>
                  <div className="task-actions">
                    <input
                      type="checkbox"
                      checked={task.status.state}
                      onChange={() => handleCheckbox(index)}
                      className="task-completed-checkbox"
                    />
                    <button onClick={() => startEdit(index)} className="edit-task-button">Edit</button>
                    <button onClick={() => deleteTask(index)} className="delete-task-button">Delete</button>
                  </div>
                </>
              )}
            </section>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>

      <div className="todo-input-section">
        <input
          type="text"
          onChange={handleChange}
          value={task}
          className="todo-input"
          placeholder="Enter your task"
        />
        <input
          type="date"
          onChange={handleDateChange}
          value={taskDate}
          className="todo-date-input"
        />
        <input
          type="time"
          onChange={handleTimeChange}
          value={taskTime}
          className="todo-time-input"
        />
        <button onClick={handleClick} className="todo-add-button">Add Task</button>
      </div>
    </div>
  );
}
