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
}) {
  return (
    <>
      <Head onNewInvoiceClick={openForm} data={invoicesData} />
      <InvoicesList data={invoicesData} setInvoicesData={setInvoicesData} />
      <FormComponent
        showForm={showForm}
        setShowForm={setShowForm}
        fromSidebar={showForm}
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
};

export default Home;
