import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Invoice from "./Invoice";

function InvoicesList({ filteredInvoices }) {
  return (
    <div className="flex w-full flex-col-reverse gap-4 p-8 md:w-9/12">
      {filteredInvoices.map((invoice) => (
        <Link to={`/invoices/${invoice.id}`} key={invoice.id}>
          <Invoice invoice={invoice} />
        </Link>
      ))}
    </div>
  );
}

export default InvoicesList;

InvoicesList.propTypes = {
  filteredInvoices: PropTypes.array.isRequired,
};
