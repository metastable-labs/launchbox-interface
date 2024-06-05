import { ICustomizeInput } from "./types";

const CustomizeInput = ({
  handleChange,
  label,
  placeholder,
  instruction,
  value,
  type = "string",
  disabled,
  variant = "primary",
  rows,
}: ICustomizeInput) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={placeholder}
      className="text-primary-2000 text-xs font-medium"
    >
      {label}
    </label>

    {variant === "primary" && (
      <input
        type={type}
        id={placeholder}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        className="px-3 py-2 border border-primary-1950 rounded-lg bg-white shadow-nav-select-shadow outline-none self-stretch text-primary-2200"
        value={value}
        disabled={disabled}
      />
    )}

    {variant === "secondary" && (
      <textarea
        className="px-3 py-2 border border-primary-1950 rounded-lg  bg-white shadow-nav-select-shadow outline-none self-stretch text-primary-2200"
        rows={rows}
        id={placeholder}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    )}

    {instruction && <p className="text-primary-700 text-xs ">{instruction}</p>}
  </div>
);

export default CustomizeInput;
