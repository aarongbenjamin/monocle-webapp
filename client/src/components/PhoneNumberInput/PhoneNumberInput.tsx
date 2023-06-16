import { FormControl, TextField } from '@mui/material';
import React, { ChangeEventHandler, forwardRef } from 'react';
import { DefaultInputComponentProps } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';

export interface PhoneNumberInputProps {
  fullWidth?: boolean;
  value: string;
  onChange: (value: string) => void;
}
const CustomInput = forwardRef<HTMLInputElement, DefaultInputComponentProps>(
  (props, ref) => {
    return <TextField {...props} inputRef={ref} />;
  }
);
const PhoneNumberInput: React.FC<PhoneNumberInputProps> = (props) => {
  return (
    <FormControl fullWidth>
      <PhoneInput
        {...props}
        placeholder="(999) 999-9999"
        defaultCountry="US"
        inputComponent={CustomInput}
      />
    </FormControl>
  );
};

export default PhoneNumberInput;
