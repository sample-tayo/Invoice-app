export default function Sidebar() {
  return (
    <aside className="h-auto w-screen bg-secondary px-4 md:h-screen md:w-24 md:px-0">
      <nav className="flex h-full flex-row items-center justify-between shadow-sm md:flex-col">
        <img
          src="src/assets/images/newlogo.svg"
          alt="logo"
          className="w-12 py-5"
        />

        <div className="flex flex-row items-center justify-center gap-5 py-3 md:flex-col">
          <img src="/src/assets/images/icon-sun.svg" alt="" className="w-10" />
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
