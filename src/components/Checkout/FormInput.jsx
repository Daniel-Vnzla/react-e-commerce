import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import CustomInput from './CustomInput.jsx';

function FormInput({ name, label }) {
  const { control } = useFormContext();
  const isError = false;

  return (
      <Controller
        as={CustomInput}
        name={name}
        control={control}
        label={label}
        defaultValue=""
        fullWidth
        error={isError}
      />
  );
}

export default FormInput;