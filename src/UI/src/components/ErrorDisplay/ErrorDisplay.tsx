import React from 'react';
import { Alert } from '@mui/material';
import { ValidationErrorResponse } from '../../models/validationError';

type ErrorDisplayProps = {
  error: ValidationErrorResponse;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return <Alert severity="error">Please fix field errors</Alert>;
};

export default ErrorDisplay;
