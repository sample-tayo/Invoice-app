import { Field } from "formik";
import PropTypes from "prop-types";

const FormItem = ({ index, item, errors, touched, remove }) => {
  const calculateTotal = (quantity, price) => {
    return quantity * price;
  };
  return (
    <div className="item flex gap-2 " key={index}>
      {/* Item Name */}
      <div className=" w-1/3">
        <label
          className="mb-1 block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
          style={{ fontSize: "0.7rem" }}
          htmlFor={`items.${index}.name`}
        >
          Item Name
        </label>
        <Field
          type="text"
          name={`items.${index}.name`}
          className={`w-full rounded border
          border-light-form-fieldBorder bg-light-form-fieldBg p-2 font-semibold text-light-text-formLabel dark:border-dark-form-fieldBorder
          dark:bg-dark-form-fieldBg dark:text-dark-text-formLabel ${
            errors.items &&
            errors.items[index] &&
            errors.items[index].name &&
            touched.items &&
            touched.items[index] &&
            touched.items[index].name
              ? "border-red-500"
              : ""
          }`}
        />
        {errors.items &&
          errors.items[index] &&
          errors.items[index].name &&
          touched.items &&
          touched.items[index] &&
          touched.items[index].name && (
            <div className="text-sm text-red-500">
              {errors.items[index].name}
            </div>
          )}
      </div>

      {/* Quantity */}
      <div className="w-1/6">
        <label
          className="mb-1 block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
          style={{ fontSize: "0.7rem" }}
          htmlFor={`items.${index}.quantity`}
        >
          Qty
        </label>
        <Field
          type="number"
          name={`items.${index}.quantity`}
          className={`w-full rounded border border-light-form-fieldBorder bg-light-form-fieldBg
          p-2 font-semibold text-light-text-formLabel dark:border-dark-form-fieldBorder dark:bg-dark-form-fieldBg dark:text-dark-text-formLabel ${
            errors.items &&
            errors.items[index] &&
            errors.items[index].quantity &&
            touched.items &&
            touched.items[index] &&
            touched.items[index].quantity
              ? "border-red-500"
              : ""
          }`}
        />
        {errors.items &&
          errors.items[index] &&
          errors.items[index].quantity &&
          touched.items &&
          touched.items[index] &&
          touched.items[index].quantity && (
            <div className="text-sm text-red-500">
              {errors.items[index].quantity}
            </div>
          )}
      </div>

      {/* Price */}
      <div className="w-1/6">
        <label
          className="mb-1  block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
          style={{ fontSize: "0.7rem" }}
          htmlFor={`items.${index}.price`}
        >
          Price
        </label>
        <Field
          type="number"
          name={`items.${index}.price`}
          className={`w-full rounded border border-light-form-fieldBorder bg-light-form-fieldBg
          p-2 font-semibold text-light-text-formLabel dark:border-dark-form-fieldBorder dark:bg-dark-form-fieldBg dark:text-dark-text-formLabel ${
            errors.items &&
            errors.items[index] &&
            errors.items[index].price &&
            touched.items &&
            touched.items[index] &&
            touched.items[index].price
              ? "border-red-500"
              : ""
          }`}
        />
        {errors.items &&
          errors.items[index] &&
          errors.items[index].price &&
          touched.items &&
          touched.items[index] &&
          touched.items[index].price && (
            <div className="text-sm text-red-500">
              {errors.items[index].price}
            </div>
          )}
      </div>

      {/* Total */}
      <div className="flex w-1/5 flex-col  text-light-text-formLabel dark:text-dark-text-formLabel">
        <p
          className="mb-1 block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
          style={{ fontSize: "0.7rem" }}
        >
          Total
        </p>
        <p className=" rounded border p-2 font-semibold">
          {calculateTotal(item.quantity, item.price)}
        </p>
      </div>

      {/* Delete Icon */}
      <div className="m-auto">
        <button
          type="button"
          onClick={() => remove(index)}
          className="border-none bg-transparent text-delete"
        >
          <img src="/assets/images/icon-delete.svg" alt="delete-button" />
        </button>
      </div>
    </div>
  );
};

FormItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  // name: PropTypes.string,
};

export default FormItem;
