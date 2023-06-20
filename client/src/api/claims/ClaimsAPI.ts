import axios, { AxiosError } from 'axios';
import { IClaim } from '../../models/claim';
import { ValidationErrorResponse } from '../../models/validationError';

export const fetchClaims = async () => {
  const response = await axios.get<IClaim[]>('/api/claims');

  return response.data;
};

export const fetchClaimById = async (claimId: string) => {
  const response = await axios.get<IClaim>(`/api/claims/${claimId}`);

  return response.data;
};
export const updateClaim = async (
  claimId: string,
  updatedData: Partial<IClaim>
): Promise<IClaim | ValidationErrorResponse> => {
  try {
    const response = await axios.put<IClaim>(
      `/api/claims/${claimId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ValidationErrorResponse>;
      if (axiosError.response?.status === 400) {
        return axiosError.response.data;
      }
    }
    throw error; // Re-throw the error for other error handling layers
  }
};