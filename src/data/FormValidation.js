import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
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
      name: Yup.string().required("required"),
      quantity: Yup.number().min(1, "Qty").required("Qty").positive().integer(),
      price: Yup.number().min(0.01, "min 0.01").required("Price").positive(),
    }),
  ),
});

export const initialValues = {
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
  paymentTerms: 7,
  // initial values for item qty
  items: [{ name: "", quantity: 0, price: 0.0 }],
};
