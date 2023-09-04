import { useField } from "formik";
import PropTypes from "prop-types";

const MyTextInput = ({ label, id, name, ...props }) => {
  const [field, meta] = useField({ name });

  return (
    <div className="mt-2">
      <label
        htmlFor={id || name}
        className="mb-1 block text-sm text-light-text-formLabel dark:text-dark-text-formLabel"
        style={{ fontSize: "0.7rem" }}
      >
        {label}
      </label>
      <input
        type="text"
        className={`w-full rounded border ${
          meta.error && meta.touched
            ? "border-red-500"
            : meta.touched && !meta.errors
            ? "border-green-400"
            : meta.touched
            ? "focus:border-blue-500"
            : "border-light-form-fieldBorder dark:border-dark-form-fieldBorder"
        } bg-light-form-fieldBg p-2 font-semibold text-light-text-bodyA dark:bg-dark-form-fieldBg dark:text-dark-text-bodyA`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextInput;

MyTextInput.propTypes = {
  label: PropTypes.string.isRequired, // Label is required and should be a string
  id: PropTypes.string, // id is optional and should be a string
  name: PropTypes.string, // name is optional and should be a string
};
