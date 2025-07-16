import { forwardRef } from "react";

const InputField = forwardRef(({ id, label, type, onChange }, ref) => {
  return (
    <div className="mb-2">
      <label className="text-gray-800" htmlFor={id}>{label}</label>
      <input
        className="w-full border border-gray-300 rounded-lg py-2 px-3"
        id={id}
        ref={ref}
        type={type}
        onChange={onChange}
        required
      />
    </div>
  );
});

export default InputField;
