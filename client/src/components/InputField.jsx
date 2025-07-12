import { forwardRef } from "react";

const InputField = forwardRef(({ id, label, type, onChange }, ref) => {
  return (
    <div className="mb-3">
      <div className="form-label-group mb-2">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          ref={ref}
          type={type}
          className="form-control"
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
});

export default InputField;
