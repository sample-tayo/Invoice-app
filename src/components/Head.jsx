import PropTypes from "prop-types";
import FilterButton from "./FilterButton";

export default function Head({ onNewInvoiceClick, data }) {
  return (
    <div className="mx-8 mt-10 flex items-center justify-between text-item-light md:mx-0 md:mt-28 md:w-3/5">
      <div className="flex flex-col items-start justify-between">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <p className="text-xs">There are {data.length} total Invoices</p>
      </div>

      <div className="flex gap-10">
        <FilterButton />

        <div
          className=" flex cursor-pointer items-center gap-3 rounded-3xl bg-hover px-3 py-3 text-item-light"
          onClick={onNewInvoiceClick}
        >
          <img
            src="/src/assets/images/icon-plus.svg"
            alt=""
            className="h-5 w-5 rounded-lg bg-white"
          />
          <p>New Invoice</p>
        </div>
      </div>
    </div>
  );
}
Head.propTypes = {
  onNewInvoiceClick: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};
