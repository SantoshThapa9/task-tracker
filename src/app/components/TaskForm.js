
import styles from "../styles/TaskForm.module.scss";

// available priority levels
const priorities = ["Low", "Medium", "High"];

export default function TaskForm({
  form,
  setForm,
  onSubmit,
  onClose,
  isEditing,
  formRef,
}) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles.taskModal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={onSubmit} ref={formRef}>
          <h3>{isEditing ? "Edit Task" : "Add Task"}</h3>
          <input
            type="text"
            placeholder="Title *"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            autoFocus
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <div className={styles.formRow}>
            <select
              value={form.priority}
              onChange={(e) =>
                setForm((f) => ({ ...f, priority: e.target.value }))
              }
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, dueDate: e.target.value }))
              }
            />
          </div>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          />
          <div className={styles.modalActions}>
            <button type="submit">{isEditing ? "Save" : "Add"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
