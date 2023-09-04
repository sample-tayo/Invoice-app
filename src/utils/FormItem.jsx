import { Field } from "formik";
import PropTypes from "prop-types";

const FormItem = ({ index, item, errors, touched, remove }) => {
  const calculateTotal = (quantity, price) => {
    return quantity * price;
  };
  return (
    <div className="item flex gap-2" key={index}>
      {/* Item Name */}
      <div className="">
        <label
          className="mb-1 block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
          style={{ fontSize: "0.7rem" }}
          htmlFor={`items.${index}.itemName`}
        >
          Item Name
        </label>
        <Field
          type="text"
          name={`items.${index}.itemName`}
          className={`text-title-dark w-48
          rounded border border-light-form-fieldBorder bg-light-form-fieldBg p-2 font-semibold
          dark:border-dark-form-fieldBorder dark:bg-dark-form-fieldBg ${
            errors.items &&
            errors.items[index] &&
            errors.items[index].itemName &&
            touched.items &&
            touched.items[index] &&
            touched.items[index].itemName
              ? "border-red-500"
              : ""
          }`}
        />
        {errors.items &&
          errors.items[index] &&
          errors.items[index].itemName &&
          touched.items &&
          touched.items[index] &&
          touched.items[index].itemName && (
            <div className="text-sm text-red-500">
              {errors.items[index].itemName}
            </div>
          )}
      </div>

      {/* Quantity */}
      <div className="">
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
          className={` w-20 rounded border
          border-light-form-fieldBorder bg-light-form-fieldBg p-2 font-semibold dark:border-dark-form-fieldBorder dark:bg-dark-form-fieldBg ${
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
      <div className="">
        <label
          className="mb-1 block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
          style={{ fontSize: "0.7rem" }}
          htmlFor={`items.${index}.price`}
        >
          Price
        </label>
        <Field
          type="number"
          name={`items.${index}.price`}
          className={`w-32 rounded border
          border-light-form-fieldBorder bg-light-form-fieldBg p-2 font-semibold dark:border-dark-form-fieldBorder dark:bg-dark-form-fieldBg ${
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
      <div className="text-title-dark flex  w-20 flex-col">
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
      <div className="my-auto">
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-delete border-none bg-transparent"
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
    itemName: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default FormItem;
