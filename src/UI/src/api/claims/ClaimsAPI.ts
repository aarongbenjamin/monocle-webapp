import axios, { AxiosError } from 'axios';
import { IClaim } from '../../models/claim';
import { ValidationErrorResponse } from '../../models/validationError';

export const createClaim = async () => {
  const response = await axios.post<IClaim>('/claims');

  return response.data;
};
export const fetchClaims = async () => {
  const response = await axios.get<IClaim[]>('/claims');

  return response.data;
};

export const fetchClaimById = async (claimId: string) => {
  const response = await axios.get<IClaim>(`/claims/${claimId}`);

  return response.data;
};

export const exists = async (claimNumber: string) => {
  const claim = await axios.head(`/claims/${claimNumber}`);
  
  return claim;
}

export const updateClaim = async (
  claimId: string,
  updatedData: Partial<IClaim>
): Promise<IClaim | ValidationErrorResponse> => {
  try {
    const response = await axios.put<IClaim>(`/claims/${claimId}`, updatedData);
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
