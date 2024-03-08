import React, { useState } from 'react';
import styles from "../styles/Home.module.css";
import Head from 'next/head';

const Index = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskProgress, setTaskProgress] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = () => {
    setShowDialog(true);
  };

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    setEditDialog(true);
    const taskToEdit = tasks.find(task => task.id === taskId);
    setTaskName(taskToEdit.name);
    setTaskProgress(taskToEdit.progress);
  };

  const handleChange = (event, field) => {
    if (field === 'name') {
      setTaskName(event.target.value);
    } else {
      setTaskProgress(event.target.value);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditDialog(false);
    setEditTaskId(null);
    setTaskName('');
    setTaskProgress(0);
  };

  const handleConfirm = () => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      progress: taskProgress
    };
    if (editDialog) {
      const updatedTasks = tasks.map(task => {
        if (task.id === editTaskId) {
          return {
            ...task,
            name: taskName,
            progress: taskProgress
          };
        }
        return task;
      });
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <main>
        <div className={styles.grid}></div>
        <div className={styles.top}>
          <button className={styles.signin}>Sign in</button>
          <h1>D<i>O</i>OP</h1>
          <p><small>a todo app</small></p>
          <div className={styles.main}>
            <button className={styles.tsk} onClick={handleAddTask}>Add task</button>

            <div className={styles.tasks}>
              {tasks.map(task => (
                <div key={task.id} className={styles.task}>
                  <span>{task.name}</span>
                  <span>{task.progress}%</span>
                  <button className={styles.editButton} onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>

          {(showDialog || editDialog) &&
            <div className={styles.dialog}>
              <div className={styles.dialogcont}>
                <div>
                  <label htmlFor="taskName">Task Name:</label>
                  <input type="text" id="taskName" value={taskName} onChange={(e) => handleChange(e, 'name')} />
                </div>
                <div>
                  <label htmlFor="taskProgress">Task Progress:</label>
                  <input type="range" id="taskProgress" min="0" max="100" value={taskProgress} onChange={(e) => handleChange(e, 'progress')} />
                  <span>{taskProgress}%</span>
                </div>
                <div className={styles.buttonGroup}>
                  <button onClick={handleConfirm} className={styles.addTaskButton}>{editDialog ? 'Edit Task' : 'Add Task'}</button>
                  <button onClick={handleCloseDialog} className={styles.closeButton}>Close</button>
                </div>
              </div>
            </div>
          }
        </div>
      </main>
    </>
  );
}

export default Index;
