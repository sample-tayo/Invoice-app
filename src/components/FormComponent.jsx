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
  senderStreet: Yup.string().required("Required"),
  senderCity: Yup.string().required("Required"),
  senderPostCode: Yup.string().required("Required"),
  senderCountry: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  clientEmail: Yup.string().email("Invalid email").required("Required"),
  clientStreet: Yup.string().required("Required"),
  clientCity: Yup.string().required("Required"),
  clientPostCode: Yup.string().required("Required"),
  clientCountry: Yup.string().required("Required"),
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
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  description: "",
  // initial values for item qty
  items: [{ itemName: "", quantity: 0, price: 0.0 }],
};

const FormComponent = ({
  showForm,
  setShowForm,
  fromSidebar,
  addInvoice,
  editInvoice,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disableValidation, setDisableValidation] = useState(false);

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

  function createNewInvoice(values, status = "pending") {
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
      status: status,
      senderAddress: {
        street: values.senderStreet,
        city: values.senderCity,
        postCode: values.senderPostCode,
        country: values.senderCountry,
      },
      clientAddress: {
        street: values.clientStreet,
        city: values.clientCity,
        postCode: values.clientPostCode,
        country: values.clientCountry,
      },
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
    };

    return newInvoice;
  }

  function handleSubmit(values) {
    // Call createNewInvoice to create a new invoice with status "pending"
    const newInvoice = createNewInvoice(values, "pending");

    // Call the addInvoice function with the new invoice data
    addInvoice(newInvoice);

    // Close the form
    setShowForm(false);

    if (!disableValidation) {
      // Validate the form using Yup schema
      try {
        validationSchema.validateSync(values, { abortEarly: false });
      } catch (validationErrors) {
        return;
      }
    }
  }

  function handleSaveToDraft(values) {
    // Call createNewInvoice to create a new invoice with status "draft"
    const newInvoice = createNewInvoice(values, "draft");

    // Call the addInvoice function with the new invoice data
    addInvoice(newInvoice);

    // Close the form
    setShowForm(false);

    // Re-enable validation
    setDisableValidation(false);
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
        initialValues={editInvoice || initialValues}
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
                name="senderStreet"
                type="text"
              />

              <div className="mt-2 flex gap-8  space-x-2">
                <NewTextInput
                  label="City"
                  name="senderCity"
                  type="text"
                  errors={errors.senderCity}
                  touched={touched.senderCity}
                />

                <NewTextInput
                  label="Post Code"
                  name="senderPostCode"
                  type="text"
                  errors={errors.senderPostCode}
                  touched={touched.senderPostCode}
                />

                <NewTextInput
                  label="Country"
                  name="senderCountry"
                  type="text"
                  errors={errors.senderCountry}
                  touched={touched.senderCountry}
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
                name="clientStreet"
                type="clientStreet"
              />
              <div className="mt-2 flex gap-8  space-x-2">
                <NewTextInput
                  label="City"
                  name="clientCity"
                  type="text"
                  errors={errors.clientCity}
                  touched={touched.clientCity}
                />

                <NewTextInput
                  label="Post Code"
                  name="clientPostCode"
                  type="text"
                  errors={errors.clientPostCode}
                  touched={touched.clientPostCode}
                />

                <NewTextInput
                  label="Country"
                  name="clientCountry"
                  type="text"
                  errors={errors.clientCountry}
                  touched={touched.clientCountry}
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
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedDate(null);
                }}
                className="rounded-2xl bg-gray-300 p-2"
              >
                Discard
              </button>
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => handleSaveToDraft(values)}
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
  // editInvoice: PropTypes.shape({
  //   senderStreet: PropTypes.string.isRequired,
  //   senderCity: PropTypes.string.isRequired,
  //   senderPostCode: PropTypes.string.isRequired,
  //   senderCountry: PropTypes.string.isRequired,
  //   clientName: PropTypes.string.isRequired,
  //   clientStreet: PropTypes.string.isRequired,
  //   clientCity: PropTypes.string.isRequired,
  //   clientPostCode: PropTypes.string.isRequired,
  //   clientCountry: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   paymentTerms: PropTypes.string.isRequired,
  // }),

  editInvoice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    paymentDue: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    paymentTerms: PropTypes.number.isRequired,
    clientName: PropTypes.string.isRequired,
    senderStreet: PropTypes.string.isRequired,
    clientEmail: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["draft", "pending", "paid"]).isRequired,
    // senderAddress: PropTypes.shape({
    //   street: PropTypes.string.isRequired,
    //   city: PropTypes.string.isRequired,
    //   postCode: PropTypes.string.isRequired,
    //   country: PropTypes.string.isRequired,
    // }).isRequired,
    clientAddress: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      postCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }),
    ).isRequired,
    total: PropTypes.number.isRequired,
  }),
};

export default FormComponent;
