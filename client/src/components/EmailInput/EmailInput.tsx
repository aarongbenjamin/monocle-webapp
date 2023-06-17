import { TextField } from '@mui/material';

// Example reusable Email input component
interface EmailInputProps {
  value?: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Apply email validation logic if needed
    onChange(value);
  };

  return <TextField label="Email" value={value} onChange={handleInputChange} />;
};

export default EmailInput;
