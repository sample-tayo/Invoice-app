import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";

function AddNewItem() {
  const validationSchema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        itemName: Yup.string().required("Item Name is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .positive()
          .integer(),
        price: Yup.number().required("Price is required").positive(),
      }),
    ),
  });

  const initialValues = {
    items: [{ itemName: "", quantity: "", price: "" }],
  };

  const calculateTotal = (quantity, price) => {
    return quantity * price;
  };

  return (
    <FieldArray name="items">
      {({ push, remove }) => (
        <div className="mt-4 flex flex-col gap-4 ">
          {values.items.map((item, index) => (
            <div className="flex items-center space-x-4" key={index}>
              {/* Item Name */}
              <div className="flex-1">
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor={`items.${index}.itemName`}
                >
                  Item Name
                </label>
                <Field
                  type="text"
                  name={`items.${index}.itemName`}
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
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
              <div className="flex-1">
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor={`items.${index}.quantity`}
                >
                  Quantity
                </label>
                <Field
                  type="number"
                  name={`items.${index}.quantity`}
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
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
              <div className="flex-1">
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor={`items.${index}.price`}
                >
                  Price
                </label>
                <Field
                  type="number"
                  name={`items.${index}.price`}
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
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
              <p className="flex-1 flex-col items-center justify-between text-title-dark">
                <p
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                >
                  Total
                </p>
                <p>
                  <p>{calculateTotal(item.quantity, item.price)}</p>
                </p>
              </p>

              {/* Delete Icon */}
              <div className="flex-none">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="border-none bg-transparent text-delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => push({ itemName: "", quantity: "", price: "" })}
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
      )}
    </FieldArray>
  );
}

export default AddNewItem;
