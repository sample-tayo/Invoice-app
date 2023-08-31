import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoicesList from "./components/InvoiceList";
import Sidebar from "./components/SideBar";
import Head from "./components/Head";
import FormComponent from "./components/FormComponent";
import ItemEdit from "./components/ItemEdit"; // Import ItemEdit component
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

  return (
    <Router>
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
    </Router>
  );
}
