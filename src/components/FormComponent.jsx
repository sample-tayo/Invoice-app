import { useState, useEffect, useRef } from "react";
import styles from "./FormComponent.module.css";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
// datepicker library import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import MyTextInput from "../utils/MyTextInput";
import NewTextInput from "../utils/NewTextInput";
import FormItem from "../utils/FormItem";

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

const initialValues = {
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
};

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

  function handleSubmit(values) {
    console.log("handleSubmit called");
    console.log("Form:", values);

    // Format createdAt and paymentDue dates
    const createdAtFormatted = format(new Date(), "yyyy-MM-dd");

    const paymentDueFormatted = format(selectedDate, "yyyy-MM-dd");

    // Convert quantity and price to numbers
    const items = values.items.map((item) => ({
      itemName: item.itemName,
      quantity: parseInt(item.quantity, 10),
      price: parseFloat(item.price),
      total: parseInt(item.quantity, 10) * parseFloat(item.price),
    }));

    // Convert paymentTerms to an integer
    const paymentTerms = parseInt(values.paymentTerms, 10);

    // Construct the newInvoice object
    const newInvoice = {
      id: "",
      createdAt: createdAtFormatted,
      paymentDue: paymentDueFormatted,
      description: values.description,
      paymentTerms: paymentTerms,
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
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
    };
    console.log(newInvoice);

    // Call the addInvoice function with the new invoice data
    addInvoice(newInvoice);

    // Close the form
    setShowForm(false);
  }

  function handleDiscard() {
    // Reset the form values to initial values

    setSelectedDate(null);

    // Close the form
    setShowForm(false);
  }

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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ values, errors, touched }) => (
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

              <MyTextInput
                label="Street Address"
                name="billFromStreetAddress"
                type="text"
              />

              <div className="mt-2 flex gap-8  space-x-2">
                <NewTextInput
                  label="City"
                  name="billFromCity"
                  type="text"
                  errors={errors.billFromCity}
                  touched={touched.billFromCity}
                />

                <NewTextInput
                  label="Post Code"
                  name="billFromPostCode"
                  type="text"
                  errors={errors.billFromPostCode}
                  touched={touched.billFromPostCode}
                />

                <NewTextInput
                  label="Country"
                  name="billFromCountry"
                  type="text"
                  errors={errors.billFromCountry}
                  touched={touched.billFromCountry}
                />
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
              {/* clientName */}
              <MyTextInput label="Name" name="clientName" type="text" />
              {/* clientEmail */}
              <MyTextInput label="Email" name="clientEmail" type="text" />
              {/* bill to street address */}
              <MyTextInput
                label="Street Address"
                name="billToStreetAddress"
                type="billToStreetAddress"
              />
              <div className="mt-2 flex gap-8  space-x-2">
                <NewTextInput
                  label="City"
                  name="billToCity"
                  type="text"
                  errors={errors.billToCity}
                  touched={touched.billToCity}
                />

                <NewTextInput
                  label="Post Code"
                  name="billToPostCode"
                  type="text"
                  errors={errors.billToPostCode}
                  touched={touched.billToPostCode}
                />

                <NewTextInput
                  label="Country"
                  name="billToCountry"
                  type="text"
                  errors={errors.billToCountry}
                  touched={touched.billToCountry}
                />
              </div>
              {/* description */}
              <MyTextInput label="Description" name="description" type="text" />
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
                      <FormItem
                        key={index}
                        index={index}
                        item={item}
                        errors={errors}
                        touched={touched}
                        remove={remove}
                      />
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
              <button
                onClick={() => handleDiscard()}
                type="button"
                className="rounded-2xl bg-gray-300 p-2"
              >
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
  addInvoice: PropTypes.func,
  fromSidebar: PropTypes.bool.isRequired,

  // onCloseForm: PropTypes.func.isRequired,
};

export default FormComponent;
