import PropTypes from 'prop-types';

const CustomInput = ({ type, name, placeholder, onChange, value }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 rounded hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

CustomInput.defaultProps = {
  type: 'text',
  placeholder: '',
  value: '',
};

export default CustomInput;
