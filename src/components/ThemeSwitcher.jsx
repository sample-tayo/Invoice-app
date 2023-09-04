import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={handleThemeSwitch}>
      <img
        src={
          theme === "light"
            ? "/assets/images/icon-moon.svg"
            : "/assets/images/icon-sun.svg"
        }
        alt=""
        className="w-10"
      />
    </button>
  );
};

export default ThemeSwitcher;
