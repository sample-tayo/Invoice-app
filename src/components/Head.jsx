import PropTypes from "prop-types";
import FilterButton from "./FilterButton";

export default function Head({ onNewInvoiceClick, data }) {
  return (
    <div className="mx-8 mt-10 flex items-center justify-between text-title-dark md:mx-0 md:mt-28 md:w-3/5">
      <div className="flex flex-col items-start justify-between">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <p className="text-xs">There are {data.length} total Invoices</p>
      </div>

      <div className="flex gap-10">
        <FilterButton />

        <div
          onClick={onNewInvoiceClick}
          className="flex w-20 cursor-pointer flex-row items-center gap-1 rounded-3xl bg-hover px-3 py-3 text-title-dark md:w-auto"
        >
          <img
            src="/assets/images/icon-plus.svg"
            alt=""
            className="h-5 w-5 md:rounded-lg md:bg-white"
          />
          <p className="md:inline-block">
            New <span className="hidden md:inline-block">Invoice</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
Head.propTypes = {
  onNewInvoiceClick: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};
