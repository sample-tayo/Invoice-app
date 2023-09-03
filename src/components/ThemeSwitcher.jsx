import { useState } from "react";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleDarkMode}>
      <img
        onClick={toggleDarkMode}
        src={
          darkMode
            ? "/assets/images/icon-sun.svg"
            : "/assets/images/icon-moon.svg"
        }
        alt=""
        className="w-10"
      />
    </button>
  );
};

export default ThemeSwitcher;
