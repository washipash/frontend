import { useTheme } from "../hooks/dark";
import { useState } from "react";
import "../setting_lib/css/ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  const handleToggle = () => {
    toggleTheme();
    setIsDark((prev) => !prev);
  };

  return (
    <button id="modo" onClick={handleToggle} className={isDark ? "dark-mode" : ""}>
      <span className="circle"></span>
    </button>
  );
};

export default ThemeToggle;
