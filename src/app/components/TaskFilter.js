
import styles from "../styles/TaskFilter.module.scss";

export default function TaskFilter({
  filter,
  setFilter,
  search,
  setSearch,
  counts,
  onAddClick,
}) {
  return (
    <section className={styles.taskControls}>
      <button onClick={onAddClick} className={styles.addBtn}>
        + Add Task
      </button>
      <input
        type="text"
        placeholder="Search by title or tag..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.filterTabs}>
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            className={filter === f ? styles.active : undefined}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className={styles.count}>{counts[f]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
