import PropTypes from "prop-types";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-30 h-auto w-screen px-4 dark:bg-nav-dark md:h-screen md:w-24 md:px-0">
      <nav className="flex h-full flex-row items-center justify-between shadow-sm md:flex-col">
        <img
          src="/assets/images/newlogo.svg"
          alt="logo"
          className="w-12 py-5"
        />

        <div className="flex flex-row items-center justify-center gap-5 py-3 md:flex-col">
          <ThemeSwitcher />
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="h-10 w-10 rounded-md"
          />
        </div>
      </nav>
    </aside>
  );
}
Sidebar.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
};
