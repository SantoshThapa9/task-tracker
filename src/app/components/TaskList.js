import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.scss";

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDeleteConfirm,
  confirmDeleteId,
  setConfirmDelete,
  onLoadSampleData,
}) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No tasks found.</p>
        {onLoadSampleData && (
          <button onClick={onLoadSampleData} className={styles.loadSampleBtn}>
            🧪 Load Sample Data
          </button>
        )}
      </div>
    );
  }

  return (
    <section className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDeleteConfirm={onDeleteConfirm}
          confirmDeleteId={confirmDeleteId}
          setConfirmDelete={setConfirmDelete}
        />
      ))}
    </section>
  );
}
