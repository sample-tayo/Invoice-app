import { Link } from "react-router-dom"; // Import Link from React Router
import PropTypes from "prop-types";
import Invoice from "./Invoice";
// import styles from "./InvoiceList.module.css";

function InvoicesList({ invoicesData }) {
  return (
    <div className="mt-8 flex w-full flex-col-reverse px-8 md:w-9/12 md:gap-4">
      {invoicesData.map((invoice, index) => (
        <Link
          to={`/invoices/${invoice.id}`}
          key={invoice.id}
          // className={styles.invoiceLink}
        >
          <Invoice invoice={invoice} isFirst={index === 0} />
        </Link>
      ))}
    </div>
  );
}

export default InvoicesList;

InvoicesList.propTypes = {
  data: PropTypes.array.isRequired,
  invoicesData: PropTypes.array.isRequired,
};
