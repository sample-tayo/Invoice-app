import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="bg-backgroundDark flex flex-col bg-light-body-bg dark:bg-dark-body-bg md:flex-row">
      <Sidebar />

      <main className="relative flex h-screen flex-1 flex-col items-center overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
