import PropTypes from "prop-types";

function Invoice({ invoice }) {
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="hover:border-primaryHover flex items-center rounded-md  bg-light-invoiceItem-bg p-2 hover:border hover:transition hover:duration-300 hover:ease-in-out dark:bg-dark-invoiceItem-bg  md:gap-2 md:p-4">
      <div
        className={` grid w-full grid-cols-2 items-center   gap-4 md:grid-cols-5 md:flex-row md:gap-x-9`}
      >
        <p className="w-20 text-sm font-semibold text-light-text-placeholder dark:text-dark-text-placeholder ">
          <span className="text-primary">#</span>
          {invoice.id}
        </p>
        <p
          className="w-36 text-right text-sm font-light text-light-text-bodyB dark:text-dark-text-bodyB md:text-left"
          style={{ fontSize: "0.7rem" }}
        >
          Due {formatDate(invoice.paymentDue)}
        </p>
        <div className="flex flex-col items-start">
          <p
            style={{ fontSize: ".8rem" }}
            className="flex-1 text-left text-light-text-bodyB dark:text-dark-text-bodyB"
          >
            {invoice.clientName}
          </p>
          <p className="min-content font-bold text-light-text-placeholder dark:text-dark-text-placeholder md:hidden">
            ${invoice.total}
          </p>
        </div>

        <p className="min-content hidden text-left font-bold text-light-text-placeholder dark:text-dark-text-placeholder md:block">
          &pound;{invoice.total}
        </p>

        <div
          className={`min-content w-26 flex h-10 items-center justify-around  rounded bg-opacity-10 px-3`}
          style={{
            backgroundColor: `var(--${invoice.status}-with-opacity)`,
            color: `var(--${invoice.status})`,
          }}
        >
          <div
            className={`h-3 w-3 rounded-full bg-${invoice.status}`}
            style={{
              backgroundColor: `var(--${invoice.status})`,
            }}
          ></div>
          <p
            className={`text-${invoice.status} font-xs font-semibold capitalize`}
            style={{ fontSize: "0.75rem" }}
          >
            {invoice.status}
          </p>
        </div>

        {/* Right Arrow */}

        {/* endf of arror */}
      </div>

      <div className="col-span-1 hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          fill="#9277FF"
        >
          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
        </svg>
      </div>
    </div>
  );
}

Invoice.propTypes = {
  invoice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    paymentDue: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["draft", "pending", "paid"]).isRequired,
  }).isRequired,
};

export default Invoice;
