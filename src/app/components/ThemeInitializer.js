"use client";
import { useEffect } from "react";
import { initializeTheme } from "../utils/theme";

// theme initializer component - sets up theme on app load
export default function ThemeInitializer() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return null; // this component doesn't render anything
}
