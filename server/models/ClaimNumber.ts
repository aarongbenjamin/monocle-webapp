import { Schema, model } from 'mongoose';

export interface IClaimNumber extends Document {
  claimNumber: string;
}

export const ClaimNumberSchema = new Schema<IClaimNumber>({
  claimNumber: {
    type: String,
    unique: true,
    required: true
  }
});

// Create the claim model
export const ClaimNumberModel = model<IClaimNumber>(
  'ClaimNumber',
  ClaimNumberSchema
);
