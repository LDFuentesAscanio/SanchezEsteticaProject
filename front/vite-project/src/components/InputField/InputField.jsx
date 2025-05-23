import PropTypes from "prop-types";
import styles from "./InputField.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function InputField({ name, type = "text", placeholder, value, onChange, error, iconClick }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{placeholder}</label>
      <div className={styles.inputContainer}>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {name === "password" && (
          <span className={styles.icon} onClick={iconClick}>
            {type === "password" ? <FaEyeSlash /> : <FaEye />} 
          </span>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  iconClick: PropTypes.func, 
};

export default InputField;
