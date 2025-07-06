import styles from "../styles/TaskItem.module.scss";
import { MdEdit, MdDelete } from "react-icons/md";
export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDeleteConfirm,
  confirmDeleteId,
  setConfirmDelete,
}) {
  return (
    <div
      className={`${styles.taskItem} ${
        task.completed ? styles.completed : styles.pending
      } ${styles[`priority${task.priority}`]}`}
      style={{ animation: "fadeIn 0.5s" }}
    >
      <div className={styles.taskMain}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          title="Toggle complete"
        />
        <div className={styles.taskInfo}>
          <div className={styles.taskTitleRow}>
            <span className={styles.taskTitle}>{task.title}</span>
            {task.tags?.length > 0 && (
              <span className={styles.taskTags}>
                {task.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
          {task.description && (
            <div className={styles.taskDesc}>{task.description}</div>
          )}
          <div className={styles.taskMeta}>
            <span className={styles.taskDate}>
              Created: {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.dueDate && (
              <span className={styles.taskDue}>Due: {task.dueDate}</span>
            )}
            <span className={styles[`priority${task.priority}`]}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.taskActions}>
        <button
          onClick={() => onEdit(task)}
          className={styles.iconBtn}
          title="Edit"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => setConfirmDelete(task.id)}
          className={styles.iconBtn}
          title="Delete"
        >
          <MdDelete />
        </button>
      </div>

      {confirmDeleteId === task.id && (
        <div className={`${styles.modal} ${styles.confirmModal}`}>
          <span>Delete this task?</span>
          <div className={styles.modalActions}>
            <button
              onClick={() => onDeleteConfirm(task.id)}
              className={styles.danger}
            >
              Delete
            </button>
            <button onClick={() => setConfirmDelete(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
