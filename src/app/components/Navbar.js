
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Navbar.module.scss";
import {
  PiSunDimLight,
  PiMoonStarsLight,
  PiSignOutLight,
  PiListLight,
} from "react-icons/pi";
import { getStoredUsername, clearUsername } from "../utils/localStorage";
import { getStoredTheme, toggleTheme } from "../utils/theme";

// navbar component - main navigation bar with theme toggle and user info
export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // load user data and theme on component mount
  useEffect(() => {
    const user = getStoredUsername();
    if (!user) {
      router.replace("/login");
      return;
    }
    setUsername(user);
    setTheme(getStoredTheme());
  }, [router]);

  // handle user logout
  const handleLogout = () => {
    clearUsername();
    router.replace("/login");
  };

  // handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  // toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* App Branding */}
        <div className={styles.navbarBrand}>
          <h1 className={styles.appTitle}>Task Tracker</h1>
         
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navbarDesktop}>
          <div className={styles.userInfo}>
            <span className={styles.welcomeText}>Welcome, {username}</span>
          </div>

          <div className={styles.navbarActions}>
            <button
              onClick={handleThemeToggle}
              className={styles.iconBtn}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <PiSunDimLight /> : <PiMoonStarsLight />}
            </button>

            <button
              onClick={handleLogout}
              className={styles.iconBtn}
              title="Logout"
              aria-label="Logout"
            >
              <PiSignOutLight />
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className={styles.mobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <PiListLight />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileUserInfo}>
            <span className={styles.welcomeText}>Welcome, {username}</span>
          </div>

          <div className={styles.mobileActions}>
            <button
              onClick={handleThemeToggle}
              className={styles.mobileIconBtn}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <PiSunDimLight /> : <PiMoonStarsLight />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <button
              onClick={handleLogout}
              className={styles.mobileIconBtn}
              title="Logout"
            >
              <PiSignOutLight />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
