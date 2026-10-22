import { CheckIcon, PencilIcon, TrashIcon } from './Icons.jsx';
import { formatDate, isOverdue } from '../dates.js';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task);
  const classes = ['task', task.completed && 'is-done', overdue && 'is-overdue']
    .filter(Boolean)
    .join(' ');

  return (
    <li className={classes}>
      <div className="task__body">
        <span className="task__title">{task.title}</span>
        {task.due_date && (
          <span className="task__meta">
            <time dateTime={task.due_date}>{formatDate(task.due_date)}</time>
            {overdue && <span className="badge">Em atraso</span>}
          </span>
        )}
      </div>

      <button
        type="button"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={`Marcar "${task.title}" como ${task.completed ? 'pendente' : 'concluída'}`}
        className="check"
        onClick={() => onToggle(task)}
      >
        {task.completed && <CheckIcon />}
      </button>

      <div className="task__actions">
        <button
          type="button"
          className="icon-btn"
          aria-label={`Editar "${task.title}"`}
          onClick={() => onEdit(task)}
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--danger"
          aria-label={`Excluir "${task.title}"`}
          onClick={() => onDelete(task)}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
