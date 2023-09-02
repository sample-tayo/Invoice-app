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

  function generateUniqueId() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomAlphabets = Array.from(
      { length: 2 },
      () => alphabet[Math.floor(Math.random() * alphabet.length)],
    ).join("");

    const randomNumbers = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10),
    ).join("");

    return randomAlphabets + randomNumbers;
  }

  const addInvoice = (newInvoice) => {
    // Generate a unique ID for the new invoice
    newInvoice.id = generateUniqueId();

    // Calculate the total for the new invoice based on the items
    newInvoice.total = newInvoice.items.reduce(
      (acc, item) => acc + item.total,
      0,
    );

    // Add the new invoice to the invoicesData state
    setInvoicesData((prevData) => [...prevData, newInvoice]);
  };

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
              addInvoice={addInvoice}
            />
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <ItemEdit
              data={invoicesData}
              removeFromInvoicesData={removeFromInvoicesData}
              invoicesData={invoicesData}
              setInvoicesData={setInvoicesData}
              onClickEditForm={openForm}
              showForm={showForm}
              setShowForm={setShowForm}
              fromSidebar={showForm}
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
