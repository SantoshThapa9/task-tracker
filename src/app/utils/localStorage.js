// local storage utility functions for tasks, user data, and theme preferences

const TASKS_KEY = "ptt_tasks";
const USER_KEY = "ptt_username";
const THEME_KEY = "ptt_theme";

// get stored tasks from localStorage
export function getStoredTasks() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
  } catch {
    return [];
  }
}

// save tasks to localStorage
export function saveTasks(tasks) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

// get stored username from localStorage
export function getStoredUsername() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(USER_KEY) || "";
}

// clear stored username from localStorage
export function clearUsername() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
}

// get stored theme preference from localStorage
export function getStoredTheme() {
  if (typeof window === "undefined") return null;
  const theme = localStorage.getItem(THEME_KEY);
  return theme === "light" || theme === "dark" ? theme : null;
}

// save theme preference to localStorage
export function saveTheme(theme) {
  if (typeof window === "undefined") return;
  if (theme === "light" || theme === "dark") {
    localStorage.setItem(THEME_KEY, theme);
  }
}

// sample data for testing
export const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
    priority: "High",
    tags: ["react", "assignment"],
    dueDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z",
    priority: "Medium",
    tags: ["javascript", "study"],
    dueDate: "2024-01-18",
  },
];

// load sample data for testing
export function loadSampleData() {
  if (typeof window === "undefined") return;
  saveTasks(sampleTasks);
  return sampleTasks;
}

// check if sample data exists
export function hasSampleData() {
  if (typeof window === "undefined") return false;
  const storedTasks = getStoredTasks();
  return storedTasks.length > 0;
}
