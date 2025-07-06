"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getStoredTheme, saveTheme } from "../utils/localStorage";

// theme context for managing app-wide theme state
const ThemeContext = createContext();

// custom hook to access theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// theme provider component - manages dark/light theme state
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    const initializeTheme = () => {
      // Try to get saved theme from localStorage
      const savedTheme = getStoredTheme();

      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Use system preference as fallback
        const systemPrefersDark = window.matchMedia?.(
          "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(systemPrefersDark ? "dark" : "light");
      }

      setIsInitialized(true);
    };

    initializeTheme();
  }, []);

  // Apply theme to document when theme changes
  useEffect(() => {
    if (!isInitialized) return;

    // Set data-theme attribute on document element
    document.documentElement.setAttribute("data-theme", theme);

    // Add/remove dark-mode class for backward compatibility
    document.body.classList.toggle("dark-mode", theme === "dark");

    // Save theme preference to localStorage
    saveTheme(theme);
  }, [theme, isInitialized]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /**
   * Set theme to specific value
   * @param {string} newTheme - Theme to set ("light" or "dark")
   */
  const setThemeValue = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
    }
  };

  // Don't render children until theme is initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: setThemeValue }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
