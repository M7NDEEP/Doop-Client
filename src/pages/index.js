import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "../styles/Home.module.css";
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

const Index = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskProgress, setTaskProgress] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [userEmail, setUserEmail] = useState(''); // Add a state for user email

  useEffect(() => {
    // Fetch user email from localStorage or cookie
    const storedUserEmail = localStorage.getItem('userEmail') || '';
    setUserEmail(storedUserEmail);

    // Fetch tasks for the user
    fetchTasks(storedUserEmail);
  }, []); // Empty dependency array to run only once on component mount

  const fetchTasks = async (email) => {
    try {
      const response = await axios.get(`/api/todos?userEmail=${email}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

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

  const handleConfirm = async () => {
    const newTask = {
      user_email: userEmail,
      title: taskName,
      progress: taskProgress,
    };
  
    try {
      if (editDialog) {
        await axios.put(`/api/todos?id=${editTaskId}`, newTask);
      } else {
        await axios.post('/api/todos', newTask);
      }
      fetchTasks(userEmail);
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  
    handleCloseDialog();
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/todos?id=${taskId}`);
      fetchTasks(userEmail);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <main>
        <div className={styles.grid}></div>
        <div className={styles.top}>
          <Link href="/signup"><button className={styles.signin}>Sign in</button></Link>
          <h1>D<i>O</i>OP</h1>
          <p><small>a todo app</small></p>
          <div className={styles.main}>
            <button className={styles.tsk} onClick={handleAddTask}>Add task</button>

            <div className={styles.tasks}>
              <AnimatePresence>
                {tasks.map(task => (
                  <motion.div
                    key={task.id}
                    className={styles.task}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>{task.name}</span>
                    <span>{task.progress}%</span>
                    <button className={styles.editButton} onClick={() => handleEditTask(task.id)}>Edit</button>
                    <button className={styles.deleteButton} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {(showDialog || editDialog) && (
              <motion.div
                className={styles.dialog}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}

export default Index;
