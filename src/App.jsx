import { useState } from "react";
import RootLayout from "./layouts/RootLayouts";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import ItemEdit from "./components/ItemEdit";
import data from "./data/data.json";

export default function App() {
  const [invoicesData, setInvoicesData] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // func to delete items from the data
  const removeFromInvoicesData = (id) => {
    // Use the `id` to filter out the item to be deleted
    const updatedData = invoicesData.filter((item) => item.id !== id);
    setInvoicesData(updatedData);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log("heloo");
  };

  const openForm = () => {
    setShowForm(true);
    console.log("hello");
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<RootLayout toggleDarkMode={toggleDarkMode} />}>
        <Route
          index
          element={
            <Home
              invoicesData={invoicesData}
              setInvoicesData={setInvoicesData}
              openForm={openForm}
              showForm={showForm}
              fromSidebar={showForm}
              closeForm={closeForm}
              setShowForm={setShowForm}
            />
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <ItemEdit
              data={data}
              removeFromInvoicesData={removeFromInvoicesData}
              invoicesData={invoicesData}
              setInvoicesData={setInvoicesData}
              onClickEditForm={openForm}
            />
          }
        />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
