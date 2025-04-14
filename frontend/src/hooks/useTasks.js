import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasks = await getTasks();
      setTasks(tasks);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add task');
      throw err;
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, toggleComplete, removeTask, fetchTasks };
};