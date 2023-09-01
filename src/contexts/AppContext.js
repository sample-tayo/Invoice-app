import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import data from "../data/data.json";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
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

  return (
    <AppContext.Provider
      value={{
        invoicesData,
        setInvoicesData,
        showForm,
        setShowForm,
        isDarkMode,
        toggleDarkMode,
        removeFromInvoicesData,
        openForm,
        closeForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
