import React, { useState, useEffect } from 'react';
import './todo.css';

export default function Todo() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todo-list'));
    if (savedTasks) {
      setList(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleDateChange = (e) => {
    setTaskDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTaskTime(e.target.value);
  };

  const handleClick = () => {
    if (task.trim() !== '') {
      setList([...list, { name: task, date: taskDate, time: taskTime, completed: false }]);
      setTask('');
      setTaskDate('');
      setTaskTime('');
    }
  };

  const deleteTask = (deleteIndex) => {
    const newList = list.filter((_, index) => index !== deleteIndex);
    setList(newList);
  };

  const handleCheckbox = (index) => {
    const updatedList = list.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setList(updatedList);
  };

  const startEdit = (index) => {
    const taskToEdit = list[index];
    setEditTask(index);
    setEditedValue(taskToEdit.name);
  };

  const cancelEdit = () => {
    setEditTask(null);
  };

  const saveEdit = (index) => {
    const modifiedList = list.map((task, i) =>
      i === index ? { ...task, name: editedValue } : task
    );
    setList(modifiedList);
    setEditTask(null);
  };

  const handleEditChange = (e) => {
    setEditedValue(e.target.value);
  };

  const filterTasks = () => {
    if (filter === 'completed') {
      return list.filter(task => task.completed);
    } else if (filter === 'not-completed') {
      return list.filter(task => !task.completed);
    } else {
      return list;
    }
  };

  return (
    <div className="todo-container">
      <div className="tabsFeel">
        <button className="tab" onClick={() => setFilter('all')}>
          All Tasks
        </button>
        <button className="tab" onClick={() => setFilter('completed')}>
          Completed Tasks
        </button>
        <button className="tab" onClick={() => setFilter('not-completed')}>
          Not Completed Tasks
        </button>
      </div>

      <div className="text">
        <h2>Todo List App</h2>
        <p>Your one-stop destination for managing your daily tasks</p>
      </div>

      <div className="todo-task-list">
        {filterTasks().length > 0 ? (
          filterTasks().map((task, index) => (
            <section key={index} className="todo-task">
              {editTask === index ? (
                <>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(index)} className="save-button">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="cancel-button">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className={`task-name ${task.completed ? 'completed' : ''}`}>
                    {task.name} <hr /> {task.date} <hr /> {task.time}
                  </p>
                  <div className="task-actions">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCheckbox(index)}
                      className="task-completed-checkbox"
                    />
                    <button onClick={() => startEdit(index)} className="edit-task-button">
                      Edit
                    </button>
                    <button onClick={() => deleteTask(index)} className="delete-task-button">
                      Delete
                    </button>
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
        <button onClick={handleClick} className="todo-add-button">
          Add Task
        </button>
      </div>
    </div>
  );
}
