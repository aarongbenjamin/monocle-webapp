export type ValidationErrorResponse = {
  error_code: string;
  errors: {
    msg: string;
    path: string;
  }[];
};

export const isValidateErrorResponse = (
  data: any
): data is ValidationErrorResponse => {
  return data.errors !== undefined;
};
