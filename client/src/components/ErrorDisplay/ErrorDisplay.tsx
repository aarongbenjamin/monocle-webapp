import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { ValidationErrorResponse } from '../../models/validationError';

type ErrorDisplayProps = {
  error: ValidationErrorResponse;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const { errors } = error;

  return (
    <Alert severity="error">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error.msg}</li>
        ))}
      </ul>
    </Alert>
  );
};

export default ErrorDisplay;
