import { ListItem, ListItemText, Checkbox, IconButton, ListItemSecondaryAction } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <ListItem>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleComplete(task._id, !task.completed)}
      />
      <ListItemText
        primary={task.title}
        secondary={task.description}
        sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => onDelete(task._id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;