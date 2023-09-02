import PropTypes from "prop-types";
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
  return (
    <>
      <Head onNewInvoiceClick={openForm} data={invoicesData} />
      <InvoicesList
        data={invoicesData}
        setInvoicesData={setInvoicesData}
        invoicesData={invoicesData}
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
