import PropTypes from "prop-types";
import FilterButton from "./FilterButton";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function Head({ onFilterChange }) {
  const { openForm, invoicesData } = useContext(AppContext);

  return (
    <div className="mx-8 mt-10 flex items-center justify-between  md:mx-0 md:mt-28 md:w-3/5">
      <div className="flex flex-col items-start justify-between">
        <h2 className="text-2xl font-bold text-light-text-heading dark:text-dark-text-heading">
          Invoices
        </h2>
        <p className="text-xs text-light-text-bodyA dark:text-dark-text-bodyA">
          There are {invoicesData.length} total Invoices
        </p>
      </div>

      <div className="flex gap-10">
        <FilterButton onFilterChange={onFilterChange} />

        <div
          onClick={openForm}
          className="flex w-20 cursor-pointer flex-row items-center gap-1 rounded-3xl bg-primary px-3 py-3  md:w-auto"
        >
          <img
            src="/assets/images/icon-plus.svg"
            alt=""
            className="h-5 w-5 md:rounded-lg md:bg-white"
          />
          <p className="font-semibold text-light-invoiceItem-bg md:inline-block">
            New <span className="hidden md:inline-block">Invoice</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
Head.propTypes = {
  openForm: PropTypes.func,
  invoicesData: PropTypes.array,
  onFilterChange: PropTypes.func,
};
