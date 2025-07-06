"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Login.module.scss";

// login page - simple authentication with username
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    // store username in localStorage
    localStorage.setItem("ptt_username", username);

    // redirect to dashboard
    router.push("/");
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
