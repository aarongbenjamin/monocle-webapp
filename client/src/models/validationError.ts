export type ValidationErrorResponse = {
  error_code: string;
  errors: {
    msg: string;
    path: string;
  }[];
};

export const isValidateErrorResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): data is ValidationErrorResponse => {
  return data.errors !== undefined;
};
