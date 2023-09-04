import { useField } from "formik";
import PropTypes from "prop-types";

const NewTextInput = ({ label, name, type, errors, touched }) => {
  const [field] = useField(name);

  return (
    <div className="flex-grow">
      <label
        htmlFor={name}
        className="mb-1 block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
        style={{ fontSize: "0.7rem" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={`w-full rounded border ${
          errors && touched
            ? "border-red-500"
            : touched && !errors
            ? "border-green-400"
            : touched
            ? "focus:border-blue-500"
            : "border-light-form-fieldBorder dark:border-dark-form-fieldBorder"
        } bg-light-form-fieldBg p-2 font-semibold text-light-text-bodyA dark:bg-dark-form-fieldBg dark:text-dark-text-bodyA`}
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
