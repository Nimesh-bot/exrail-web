import { useState } from "react";

const useForm = (callback: any, validate: any) => {
  const [values, setValues] = useState<{} | any>({});
  const [errors, setErrors] = useState<any | {}>({});

  const handleChange = (e: any, input: string) => {
    setValues({ ...values, [input]: e.target.value });
    setErrors({ ...errors, [input]: false });
  };

  const handleSubmit = (onSubmit?: () => void) => {
    const tempErrors = validate(values);
    setErrors(tempErrors);
    onSubmit && onSubmit();
  };

  return {
    handleChange,
    handleSubmit,
    errors,
    values,
    setValues,
    setErrors,
  };
};

export default useForm;
