// theme utility functions for managing dark/light theme

// get stored theme from localStorage
export const getStoredTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("ptt_theme") || "light";
};

// save theme to localStorage
export const saveTheme = (theme) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("ptt_theme", theme);
};

// apply theme to document
export const applyTheme = (theme) => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  saveTheme(theme);
};

// initialize theme on app load
export const initializeTheme = () => {
  if (typeof window === "undefined") return "light";

  const savedTheme = getStoredTheme();
  if (savedTheme) {
    applyTheme(savedTheme);
    return savedTheme;
  }

  // use system preference as fallback
  const systemPrefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  const defaultTheme = systemPrefersDark ? "dark" : "light";
  applyTheme(defaultTheme);
  return defaultTheme;
};

// toggle between light and dark themes
export const toggleTheme = () => {
  const currentTheme = getStoredTheme();
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  return newTheme;
};
