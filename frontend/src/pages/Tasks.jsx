import { Box, List, Typography } from '@mui/material';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { tasks, loading, error, addTask, toggleComplete, removeTask } = useTasks();
  const { user } = useAuth();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.username}
      </Typography>
      <TaskForm onSubmit={addTask} />
      <List>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggleComplete={toggleComplete}
            onDelete={removeTask}
          />
        ))}
      </List>
    </Box>
  );
};

export default Tasks;