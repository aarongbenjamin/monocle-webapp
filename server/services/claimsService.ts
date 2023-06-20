import { Claim, ClaimStatus, IClaim } from '../models/Claim';
import {
  model,
  Error as MongooseError,
  Types,
  Document,
  ObjectId
} from 'mongoose';

export default {
  startClaim: async (
    title: string,
    dateOfLoss: Date
  ): Promise<IClaim | MongooseError.ValidationError> => {
    const claim = new Claim({
      title,
      dateOfLoss,
      createdDate: Date.now(),
      lastUpdatedDate: Date.now(),
      status: ClaimStatus.UnderInvestigation
    });
    const validationError = claim.validateSync();
    if (validationError) {
      return validationError;
    } else {
      const newClaimDocument = await claim.save();
      const newClaim = newClaimDocument.toObject<IClaim>();
      return newClaim;
    }
  },
  getClaimById: async (id: string): Promise<IClaim | null> => {
    const claimId = id;
    let document:
      | (Document<ObjectId, {}, IClaim> &
          Omit<
            IClaim & {
              _id: Types.ObjectId;
            },
            never
          >)
      | null = null;

    try {
      document = await Claim.findById(claimId);
    } catch (error) {
      if (!(error instanceof MongooseError.CastError)) {
        throw error;
      }
    }

    if (document) {
      return document.toObject<IClaim>();
    } else {
      return null;
    }
  },
  getClaims: async (): Promise<IClaim[]> => {
    const claims = await Claim.find().sort({ lastUpdatedDate: 'desc' }).exec();

    return claims;
  },
  updateClaimById: async (
    id: string,
    claim: Partial<IClaim>
  ): Promise<IClaim | null> => {
    try {
      const claimUpdate: Partial<IClaim> = {
        ...claim,
        lastUpdatedDate: new Date()
      };
      const updatedClaim = await Claim.findByIdAndUpdate(id, claimUpdate, {
        new: true
      });
      return updatedClaim ? updatedClaim.toObject<IClaim>() : null;
    } catch (error) {
      throw error;
    }
  }
};