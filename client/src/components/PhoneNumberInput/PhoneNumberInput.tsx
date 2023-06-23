import { FormControl, TextField } from '@mui/material';
import React, { forwardRef } from 'react';
import { DefaultInputComponentProps } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';

export interface PhoneNumberInputProps {
  fullWidth?: boolean;
  value?: string;
  labelText?: string;
  onChange: (value?: string) => void;
}
const CustomInput = forwardRef<HTMLInputElement, DefaultInputComponentProps>(
  (props, ref) => {
    return <TextField {...props} inputRef={ref} />;
  }
);
const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  fullWidth,
  onChange,
  labelText
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <PhoneInput
        value={value}
        onChange={(number) => {
          onChange(number?.toString());
        }}
        defaultCountry="US"
        label="Phone Number"
        inputComponent={CustomInput}
      />
    </FormControl>
  );
};

export default PhoneNumberInput;
