import { useField } from "formik";
import PropTypes from "prop-types";

const MyTextInput = ({ label, id, name, ...props }) => {
  const [field, meta] = useField({ name });

  return (
    <div className="mt-2">
      <label
        htmlFor={id || name}
        className="mb-1 block text-sm text-dark"
        style={{ fontSize: "0.7rem" }}
      >
        {label}
      </label>
      <input
        type="text"
        className={`w-full rounded bg-bg-dark p-2 font-semibold text-title-dark ${
          meta.error && meta.touched ? "border-red-500" : ""
        } ${meta.touched ? "border-2 focus:border-blue-500" : ""}`}
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
