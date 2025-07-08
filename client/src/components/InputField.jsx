const InputField = ({ id, label, type, onChange, placeholder }) => {
  return (
    <div className="form-label-group mb-2">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        className="form-control"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
