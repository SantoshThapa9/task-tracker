"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./styles/App.module.scss";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import Navbar from "./components/Navbar";
import {
  getStoredTasks,
  saveTasks,
  loadSampleData,
  hasSampleData,
} from "./utils/localStorage";

// dashboard page - main app page with task management
export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const formRef = useRef();

  // task form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    tags: "",
  });

  // load tasks from localStorage on component mount
  useEffect(() => {
    setTasks(getStoredTasks());
  }, []);

  // load sample data if no tasks exist
  const handleLoadSampleData = () => {
    const sampleData = loadSampleData();
    setTasks(sampleData);
  };

  // save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // filter tasks based on current filter and search criteria
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && !task.completed) return false;
    if (filter === "pending" && task.completed) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  // calculate task counts for different categories
  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  // handle task form submission (create or update task)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    // parse and clean tags from comma-separated string
    const updatedTags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (editTask) {
      // update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editTask.id
            ? {
                ...t,
                ...form,
                tags: updatedTags,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
      setEditTask(null);
    } else {
      // create new task
      setTasks((prev) => [
        {
          id: Date.now(),
          title: form.title,
          description: form.description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          completed: false,
          priority: form.priority,
          dueDate: form.dueDate,
          tags: updatedTags,
        },
        ...prev,
      ]);
    }

    // reset form and close modal
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      tags: "",
    });
    setShowModal(false);
  };

  // handle task editing - populate form with task data
  const handleEdit = (task) => {
    setEditTask(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate || "",
      tags: (task.tags || []).join(", "),
    });
    setShowModal(true);
  };

  // handle task deletion
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setConfirmDelete(null);
  };

  // toggle task completion status
  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  };

  // close modal and reset form state
  const closeModal = () => {
    setShowModal(false);
    setEditTask(null);
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      tags: "",
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <TaskFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          counts={counts}
          onAddClick={() => {
            setShowModal(true);
            setEditTask(null);
          }}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDeleteConfirm={handleDelete}
          confirmDeleteId={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          onLoadSampleData={handleLoadSampleData}
        />
      </main>

      {/* Task Form Modal */}
      {showModal && (
        <TaskForm
          form={form}
          setForm={setForm}
          onSubmit={handleFormSubmit}
          onClose={closeModal}
          isEditing={!!editTask}
          formRef={formRef}
        />
      )}
    </div>
  );
}
