import { forwardRef, useId } from "react";

const Input = forwardRef(({
  label,
  className = "",
  labelClassName = "",
  type = "text",
  ...props
}, ref) => {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label htmlFor={id} className={labelClassName}>{label}</label>}

      <input type={type} id={id} ref={ref} className={className} {...props} />
    </div>
  );
});

export default Input;
