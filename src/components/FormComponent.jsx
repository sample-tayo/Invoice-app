import { useState, useEffect, useRef } from "react";
import styles from "./FormComponent.module.css";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// datepicker library import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
});

const FormComponent = ({ showForm, setShowForm, fromSidebar }) => {
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

  const handleSubmit = (values, { setSubmitting }) => {
    if (
      Object.keys(values).length > 0 &&
      !validationSchema.isValidSync(values)
    ) {
      console.log("Form submitted successfully:", values);
    } else {
      console.log("Form has errors or empty fields");
    }

    setSubmitting(false);
  };

  return (
    <div
      className={`fixed h-full bg-black bg-opacity-50 transition-transform duration-300 ease-linear md:top-0 ${
        showForm
          ? "translate-x-0 transform"
          : `transform ${fromSidebar ? "-" : ""}translate-x-full`
      } ${styles.container}`}
    >
      <h3 className="w-full bg-backgroundDark pl-8 pt-5 text-3xl font-extrabold text-light md:w-3/6 md:pl-8 md:pt-8">
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
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form
            ref={formRef}
            style={{
              left: "0",
              position: "absolute",
              height: "100vh",
              overflowY: "auto",
            }}
            className="mx-auto w-full space-y-4 overflow-y-auto bg-backgroundDark p-4 pb-20 md:w-3/6"
          >
            {/* Bill From */}
            <div className="p-4">
              <h2
                className="mb-6 text-sm font-semibold text-primary"
                style={{ fontSize: "0.8rem" }}
              >
                Bill From:
              </h2>

              <div className="mt-2">
                {/* labelfor street address */}
                <label
                  className="mb-1 block text-sm text-light"
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

              <div className="mt-2 flex space-x-2">
                <div className="flex-grow">
                  <label
                    className="mb-1 block text-sm text-light"
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
                    className="mb-1 block text-sm text-light"
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
                    className="mb-1 block text-sm text-light"
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
            <div className=" p-4">
              <h2
                className="mb-6 text-sm font-semibold text-primary"
                style={{ fontSize: "0.8rem" }}
              >
                Bill To:
              </h2>
              <div className="mt-2">
                <label
                  className="mb-1 block text-sm text-light"
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
                  className="mb-1 block text-sm text-light"
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
                  className="mb-1 block text-sm text-light"
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
                    className="mb-1 block text-sm text-light"
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
                    className="mb-1 block text-sm text-light"
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
                    className="mb-1 block text-sm text-light"
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
                  className="mb-1 block text-sm text-light"
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
                    className="mb-1 block text-sm text-light"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Invoice Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="MMM dd, yyyy"
                      className="w-full rounded bg-bg-dark p-2 font-semibold text-light  focus:ring focus:ring-blue-300"
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
                    className="mb-1 block text-sm text-light"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Payment Terms
                  </label>
                  <select
                    id="paymentTerms"
                    name="paymentTerms"
                    className="w-full rounded bg-bg-dark p-2 font-semibold text-light focus:ring focus:ring-blue-300"
                  >
                    <option value="Next 7 days">Next 7 days</option>
                    <option value="Next 14 days">Next 14 days</option>
                    <option value="Next 30 days">Next 30 days</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-gray-300  p-2"
            >
              Add New Item
            </button>

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

  fromSidebar: PropTypes.bool.isRequired,

  // onCloseForm: PropTypes.func.isRequired,
};

export default FormComponent;
