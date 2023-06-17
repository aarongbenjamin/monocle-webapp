import { Schema, model, Document } from 'mongoose';

export interface IClaim extends Document {
  title: string;
  dateOfLoss: Date;
  createdDate: Date;
  facilities: {
    type: string;
    repairCost: string;
    description: string;
  }[];
  adverseParty: {
    name: string;
    phoneNumber: string;
    email: string;
    address: {
      addressLine1: string;
      addressLine2: string;
      unit: string;
      city: string;
      state: string;
      zip: string;
    };
    insurance: {
      companyName: string;
      adjustorName: string;
      phoneNumber: string;
      email: string;
    };
  };
  status: ClaimStatus;
}
export enum ClaimStatus {
  UnderInvestigation = 'UnderInvestigation',
  ReadyForCollection = 'ReadyForCollection',
  AttemptingCollection = 'AttemptingCollection',
  PaidInFull = 'PaidInFull'
}

export const claimSchema = new Schema<IClaim>({
  title: { type: String, required: true },
  dateOfLoss: { type: Date, required: true },
  createdDate: { type: Date, required: true },
  facilities: [
    {
      type: { type: String },
      repairCost: { type: String },
      description: { type: String }
    }
  ],
  adverseParty: {
    name: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    address: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      unit: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String }
    },
    insurance: {
      companyName: { type: String },
      adjustorName: { type: String },
      phoneNumber: { type: String },
      email: { type: String }
    }
  },
  status: {
    type: String,
    status: {
      type: String,
      enum: Object.values(ClaimStatus),
      required: true
    },
    required: true
  }
});

export const Claim = model('Claim', claimSchema);
