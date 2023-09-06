import PropTypes from "prop-types";
import { useState } from "react";
import Head from "../components/Head";
import InvoicesList from "../components/InvoiceList";
import FormComponent from "../components/FormComponent";

function Home({
  openForm,
  invoicesData,
  setInvoicesData,
  showForm,
  setShowForm,
  addInvoice,
}) {
  const [filter, setFilter] = useState("All"); // Initially, show all invoices

  // Function to handle filter changes
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Function to filter the invoices based on the selected filter
  const filteredInvoices = invoicesData.filter((invoice) => {
    if (filter === "All") {
      return true; // Show all invoices
    } else {
      return invoice.status === filter; // Filter by status
    }
  });

  return (
    <>
      <Head
        onNewInvoiceClick={openForm}
        data={invoicesData}
        onFilterChange={handleFilterChange}
      />
      <InvoicesList
        data={invoicesData}
        setInvoicesData={setInvoicesData}
        invoicesData={filteredInvoices}
      />
      <FormComponent
        showForm={showForm}
        setShowForm={setShowForm}
        fromSidebar={showForm}
        addInvoice={addInvoice}
      />
    </>
  );
}
Home.propTypes = {
  showForm: PropTypes.bool.isRequired,
  setShowForm: PropTypes.any.isRequired,
  fromSidebar: PropTypes.bool.isRequired,
};

Home.propTypes = {
  openForm: PropTypes.func.isRequired,
  invoicesData: PropTypes.array.isRequired,
  setInvoicesData: PropTypes.func.isRequired,
  addInvoice: PropTypes.func.isRequired,
};

export default Home;
