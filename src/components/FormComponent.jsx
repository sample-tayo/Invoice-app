import { useState, useEffect, useRef } from "react";
import styles from "./FormComponent.module.css";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
// datepicker library import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const validationSchema = Yup.object().shape({
  billFromStreetAddress: Yup.string().required("Required"),
  billFromCity: Yup.string().required("Required"),
  billFromPostCode: Yup.string().required("Required"),
  billFromCountry: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  clientEmail: Yup.string().email("Invalid email").required("Required"),
  billToStreetAddress: Yup.string().required("Required"),
  billToCity: Yup.string().required("Required"),
  billToPostCode: Yup.string().required("Required"),
  billToCountry: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  paymentTerms: Yup.string().required("Payment Terms is required"),
  items: Yup.array().of(
    Yup.object().shape({
      itemName: Yup.string().required("Item Name is required"),
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required")
        .positive()
        .integer(),
      price: Yup.number()
        .min(0.01, "Price must be at least 0.01")
        .required("Price is required")
        .positive(),
    }),
  ),
});

const FormComponent = ({ showForm, setShowForm, fromSidebar, addInvoice }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const formRef = useRef(null); // Reference to the Form component, Ref introduced because of click outside

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false); // Assuming setShowForm is a state updater function
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const calculateTotal = (quantity, price) => {
    return quantity * price;
  };

  const handleSubmit = (values) => {
    console.log("Form:", values);

    // Format createdAt and paymentDue dates
    const createdAtFormatted = format(new Date(), "yyyy-MM-dd");
    const paymentDueFormatted = format(selectedDate, "yyyy-MM-dd");

    // Convert quantity and price to numbers
    const quantity = parseInt(values.quantity, 10);
    const price = parseFloat(values.price);

    // Calculate the total based on quantity and price
    const total = quantity * price;

    // Construct the newInvoice object
    const newInvoice = {
      id: "",
      createdAt: createdAtFormatted,
      paymentDue: paymentDueFormatted,
      description: values.description,
      paymentTerms: values.paymentTerms,
      clientName: values.clientName,
      clientEmail: values.clientEmail,
      status: "pending",
      senderAddress: {
        street: values.billFromStreetAddress,
        city: values.billFromCity,
        postCode: values.billFromPostCode,
        country: values.billFromCountry,
      },
      clientAddress: {
        street: values.billToStreetAddress,
        city: values.billToCity,
        postCode: values.billToPostCode,
        country: values.billToCountry,
      },
      items: [
        {
          itemName: values.itemName, // Assuming you want to use the first item
          quantity: quantity,
          price: price,
          total: total,
        },
      ],
      total: total,
    };
    console.log(newInvoice);

    // Call the addInvoice function with the new invoice data
    addInvoice(newInvoice);

    // Close the form
    setShowForm(false);
  };

  return (
    <div
      className={`fixed h-full bg-black bg-opacity-50 transition-transform duration-300 ease-linear md:top-0 ${
        showForm
          ? "translate-x-0 transform"
          : `transform ${fromSidebar ? "-" : ""}translate-x-full`
      } ${styles.container}`}
    >
      <h3 className="w-full bg-backgroundDark pb-8 pl-8 pt-5 text-3xl font-extrabold text-title-dark md:w-3/6 md:px-12  md:pt-8">
        Create Invoice
      </h3>
      <Formik
        initialValues={{
          billFromStreetAddress: "",
          billFromCity: "",
          billFromPostCode: "",
          billFromCountry: "",
          clientName: "",
          clientEmail: "",
          billToStreetAddress: "",
          billToCity: "",
          billToPostCode: "",
          billToCountry: "",
          description: "",
          // initial values for item qty
          items: [{ itemName: "", quantity: 0, price: 0.0 }],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form
            ref={formRef}
            style={{
              left: "0",
              position: "absolute",
              height: "100vh",
              overflowY: "auto",
            }}
            className="mx-auto w-full space-y-4 overflow-y-auto bg-backgroundDark p-4 pb-32 md:w-3/6 md:px-12"
          >
            {/* Bill From */}
            <div className="p-4 md:p-0">
              <h2
                className="mb-6 text-sm font-semibold text-primary"
                style={{ fontSize: "0.8rem" }}
              >
                Bill From:
              </h2>

              <div className="mt-2">
                {/* labelfor street address */}
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor="billFromStreetAddress"
                >
                  Street Address
                </label>
                <Field
                  type="text"
                  name="billFromStreetAddress"
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                    errors.billFromStreetAddress &&
                    touched.billFromStreetAddress
                      ? "border-red-500"
                      : ""
                  } ${
                    touched.billFromStreetAddress
                      ? "border-2 focus:border-blue-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="billFromStreetAddress"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mt-2 flex gap-8  space-x-2">
                <div className="flex-grow">
                  <label
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                    htmlFor="billFromCity"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    name="billFromCity"
                    className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                      errors.billFromCity && touched.billFromCity
                        ? "border-red-500"
                        : ""
                    } ${
                      touched.billFromCity
                        ? "border-2 focus:border-blue-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="billFromCity"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="flex-grow">
                  <label
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                    htmlFor="billFromPostCode"
                  >
                    Post Code
                  </label>
                  <Field
                    type="text"
                    name="billFromPostCode"
                    className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                      errors.billFromPostCode && touched.billFromPostCode
                        ? "border-red-500"
                        : ""
                    } ${
                      touched.billFromPostCode
                        ? "border-2 focus:border-blue-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="billFromPostCode"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="flex-grow">
                  <label
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                    htmlFor="billFromCountry"
                  >
                    Country
                  </label>
                  <Field
                    type="text"
                    name="billFromCountry"
                    className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                      errors.billFromCountry && touched.billFromCountry
                        ? "border-red-500"
                        : ""
                    } ${
                      touched.billFromCountry
                        ? "border-2 focus:border-blue-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="billFromCountry"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className=" p-4 md:p-0">
              <h2
                className="mb-6 text-sm font-semibold text-primary"
                style={{ fontSize: "0.8rem" }}
              >
                Bill To:
              </h2>
              <div className="mt-2">
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor="clientName"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="clientName"
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                    errors.clientName && touched.clientName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="clientName"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mt-2">
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor="clientEmail"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="clientEmail"
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                    errors.clientEmail && touched.clientEmail
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="clientEmail"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mt-2">
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor="billToStreetAddress"
                >
                  Street Address
                </label>
                <Field
                  type="text"
                  name="billToStreetAddress"
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                    errors.billToStreetAddress && touched.billToStreetAddress
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="billToStreetAddress"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mt-2 flex space-x-2">
                <div className="flex-grow">
                  <label
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                    htmlFor="billToCity"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    name="billToCity"
                    className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                      errors.billToCity && touched.billToCity
                        ? "border-red-500"
                        : ""
                    } ${
                      touched.billToCity ? "border-2 focus:border-blue-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="billToCity"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="flex-grow">
                  <label
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                    htmlFor="billToPostCode"
                  >
                    Post Code
                  </label>
                  <Field
                    type="text"
                    name="billToPostCode"
                    className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                      errors.billToPostCode && touched.billToPostCode
                        ? "border-red-500"
                        : ""
                    } ${
                      touched.billToPostCode
                        ? "border-2 focus:border-blue-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="billToPostCode"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="flex-grow">
                  <label
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                    htmlFor="billToCountry"
                  >
                    Country
                  </label>
                  <Field
                    type="text"
                    name="billToCountry"
                    className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                      errors.billToCountry && touched.billToCountry
                        ? "border-red-500"
                        : ""
                    } ${
                      touched.billToCountry
                        ? "border-2 focus:border-blue-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="billToCountry"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>

              {/* description */}
              <div className="mt-2">
                <label
                  className="mb-1 block text-sm text-dark"
                  style={{ fontSize: "0.7rem" }}
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
                    errors.description && touched.description
                      ? "border-red-500"
                      : ""
                  } ${
                    touched.description ? "border-2 focus:border-blue-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              {/* invoice date */}

              <div className="mt-2 flex items-center justify-between space-x-4">
                <div className="flex flex-grow flex-col space-y-1">
                  <label
                    htmlFor="invoiceDate"
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Invoice Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="MMM dd, yyyy"
                      className="w-full rounded bg-bg-dark p-2 font-semibold text-dark  focus:ring focus:ring-blue-300"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-grow flex-col space-y-1">
                  <label
                    htmlFor="paymentTerms"
                    className="mb-1 block text-sm text-dark"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Payment Terms
                  </label>
                  <Field
                    as="select"
                    id="paymentTerms"
                    name="paymentTerms"
                    className={`w-full rounded bg-bg-dark p-2 font-semibold text-dark focus:ring focus:ring-blue-300 ${
                      errors.paymentTerms && touched.paymentTerms
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="7">Next 7 days</option>
                    <option value="14">Next 14 days</option>
                    <option value="30">Next 30 days</option>
                  </Field>
                  <ErrorMessage
                    name="paymentTerms"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
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
                        <div className="flex-1 flex-col items-center justify-between text-title-dark">
                          <p
                            className="mb-1 block text-sm text-dark"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Total
                          </p>
                          <p>
                            <span>
                              {calculateTotal(item.quantity, item.price)}
                            </span>
                          </p>
                        </div>

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
                      onClick={() =>
                        push({ itemName: "", quantity: "", price: "" })
                      }
                      className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                    >
                      Add Item
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="flex justify-between bg-backgroundDark p-4">
              <button type="button" className="rounded-2xl bg-gray-300 p-2">
                Discard
              </button>
              <div className="space-x-4">
                <button
                  type="button"
                  className="rounded-2xl bg-blue-500 p-2 text-white"
                >
                  Save to Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="submit"
                  className="rounded-2xl bg-green-500 p-2 text-white"
                >
                  Save & Send
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

FormComponent.propTypes = {
  showForm: PropTypes.bool.isRequired,
  setShowForm: PropTypes.any.isRequired,
  addInvoice: PropTypes.func,
  fromSidebar: PropTypes.bool.isRequired,

  // onCloseForm: PropTypes.func.isRequired,
};

export default FormComponent;
