import { useState } from "react";

type FormData = {
  [key: string]: unknown;
};
const useForm = (formData: FormData = {},  callback: (data: FormData) => void) => {
  const [data, setData] = useState<FormData>(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (callback) {
      callback(data);
    }
  };

  const resetForm = () => {
    setData(formData);
  };

  return { data, handleChange, handleSubmit, resetForm };
};

export default useForm;
