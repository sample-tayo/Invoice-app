import { useField } from "formik";
import PropTypes from "prop-types";

const NewTextInput = ({ label, name, type, errors, touched }) => {
  const [field] = useField(name);

  return (
    <div className="flex-grow">
      <label
        htmlFor={name}
        className="mb-1 block text-sm text-dark"
        style={{ fontSize: "0.7rem" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
          errors && touched ? "border-red-500" : ""
        } ${touched ? "border-2 focus:border-blue-500" : ""}`}
        {...field}
      />
      {touched && errors ? (
        <div className="text-sm text-red-500">{errors}</div>
      ) : null}
    </div>
  );
};

export default NewTextInput;
NewTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  errors: PropTypes.string,
  touched: PropTypes.bool,
};
