import { Link } from "react-router-dom"; // Import Link from React Router
import PropTypes from "prop-types";
import Invoice from "./Invoice";
import styles from "./InvoiceList.module.css";

function InvoicesList({ data }) {
  return (
    <div className={`${styles.container} ${styles.customScroll} `}>
      {data.map((invoice, index) => (
        <Link
          to={`/invoices/${invoice.id}`}
          key={invoice.id}
          className={styles.invoiceLink}
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
};
