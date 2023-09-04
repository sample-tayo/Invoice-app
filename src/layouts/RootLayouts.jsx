import PropTypes from "prop-types";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function RootLayout({ toggleDarkMode }) {
  return (
    <div className="bg-light-body-bg dark:bg-dark-body-bg flex flex-col bg-backgroundDark md:flex-row">
      <Sidebar toggleDarkMode={toggleDarkMode} />

      <main className="relative flex h-screen flex-1 flex-col items-center overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
RootLayout.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
};
