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
              // onNewInvoiceClick={openForm}
              openForm={openForm}
              showForm={showForm}
              fromSidebar={showForm}
              closeForm={closeForm}
              setShowForm={setShowForm}
            />
          }
        />
        <Route path="/invoices/:id" element={<ItemEdit data={data} />} />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

{
  /* <FormComponent
        showForm={showForm}
        setShowForm={setShowForm}
        onCloseForm={closeForm}
        fromSidebar={showForm}
      />
      <Routes>
        <Route path="/invoices/:id" element={<ItemEdit data={data} />} />
      </Routes> */
}

{
  /* <Router>
<div className="flex flex-col bg-backgroundDark md:flex-row">
  <Sidebar />
  <main className="relative flex h-screen flex-1 flex-col items-center overflow-y-auto">
    <Head onNewInvoiceClick={openForm} data={invoicesData} />
    <InvoicesList data={invoicesData} setInvoicesData={setInvoicesData} />
    <FormComponent
      showForm={showForm}
      setShowForm={setShowForm}
      onCloseForm={closeForm}
      fromSidebar={showForm}
    />
    <Routes>
      <Route path="/invoices/:id" element={<ItemEdit data={data} />} />
    </Routes>
  </main>
</div>
</Router> */
}
