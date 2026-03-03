const UsersDBinp = ({
  type = "text",
  INPname,
  placeholder,
  value,
  onChange,
  required = true,
  label,
}) => {
  return (
    <div className="w-full md:w-[45%] md:shrink-0 h-max flex flex-col">
      <label htmlFor={INPname} className="text-sm p-1">
        {label}
      </label>
      <input
        type={type}
        name={INPname}
        id={INPname}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full h-10 bg-white dark:bg-accentdeep-dark flex justify-center items-center p-2 rounded-sm shrink-0 outline-0"
      />
    </div>
  );
};

export default UsersDBinp;
