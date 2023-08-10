import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { validateEmail } from '../../util/validateEmail';

// Example reusable Email input component
interface EmailInputProps {
  value?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  required
}) => {
  const [error, setError] = useState<string | undefined>();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value) {
      const isValidEmail = validateEmail(value);

      if (!isValidEmail) {
        setError('Invalid email addressd');
        return;
      }
    }
    setError(undefined);
  };
  return (
    <TextField
      label="Email"
      required={required}
      value={value}
      error={!!error}
      helperText={error}
      onChange={handleInputChange}
      onBlur={handleBlur}
    />
  );
};

export default EmailInput;
