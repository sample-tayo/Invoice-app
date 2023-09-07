import { createContext, useState } from "react";
import data from "../data/data.json";
import PropTypes from "prop-types";
import generateUniqueId from "../utils/GenerateId";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
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

  const [invoicesData, setInvoicesData] = useState(data);
  const [showForm, setShowForm] = useState(false);
  return (
    <AppContext.Provider
      value={{
        showForm,
        setShowForm,
        invoicesData,
        setInvoicesData,
        addInvoice,
        openForm,
        closeForm,
        removeFromInvoicesData,
      }}
    >
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};
export default AppContext;

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
