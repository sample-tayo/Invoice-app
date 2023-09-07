import PropTypes from "prop-types";
import { useState } from "react";
import Head from "../components/Head";
import InvoicesList from "../components/InvoiceList";
import FormComponent from "../components/FormComponent";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

function Home() {
  const { invoicesData } = useContext(AppContext);
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
      <Head onFilterChange={handleFilterChange} />

      <InvoicesList filteredInvoices={filteredInvoices} />

      <FormComponent />
    </>
  );
}

Home.propTypes = {
  invoicesData: PropTypes.array,
};

export default Home;
