import axios from "axios";
import { IClaim } from "../../models/claim";

export const fetchClaims = async () => {
    const response = await axios.get<IClaim[]>('/api/claims');
    
    return response.data;
}

export const fetchClaimById = async (claimId: string) => {
    const response = await axios.get<IClaim>(`/api/claims/${claimId}`);
    
    return response.data;
}