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
import generateUniqueId from "./utils/GenerateId";

export default function App() {
  const [invoicesData, setInvoicesData] = useState(data);
  const [showForm, setShowForm] = useState(false);

  const addInvoice = (newInvoice) => {
    // Generate a unique ID for the new invoice
    newInvoice.id = generateUniqueId();

    // Check if an invoice with the same ID already exists
    const existingIndex = invoicesData.findIndex(
      (invoice) => invoice.id === newInvoice.id,
    );

    if (existingIndex !== -1) {
      // Replace the existing invoice with the new one
      const updatedInvoices = [...invoicesData];
      updatedInvoices[existingIndex] = newInvoice;
      setInvoicesData(updatedInvoices);
    } else {
      // Add the new invoice to the invoicesData state
      setInvoicesData((prevData) => [...prevData, newInvoice]);
    }
  };

  // func to delete items from the data
  const removeFromInvoicesData = (id) => {
    // Use the `id` to filter out the item to be deleted
    const updatedData = invoicesData.filter((item) => item.id !== id);
    setInvoicesData(updatedData);
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
      <Route to="/" element={<RootLayout />}>
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
