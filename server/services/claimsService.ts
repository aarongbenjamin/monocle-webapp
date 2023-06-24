import { Claim, ClaimStatus, IClaim } from '../models/Claim';
import { Error as MongooseError, Types, Document, ObjectId } from 'mongoose';

export default {
  startClaim: async (): Promise<IClaim | MongooseError.ValidationError> => {
    const claim = new Claim({
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
      | (Document<ObjectId, object, IClaim> &
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
    const claimUpdate: Partial<IClaim> = {
      ...claim,
      lastUpdatedDate: new Date()
    };
    const updatedClaim = await Claim.findByIdAndUpdate(id, claimUpdate, {
      new: true
    });
    return updatedClaim ? updatedClaim.toObject<IClaim>() : null;
  }
};
