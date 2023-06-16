import { Schema, model } from 'mongoose';

export interface IClaim {
  title: string;
  dateOfLoss: Date;
  createdDate: Date;
}
export const claimSchema = new Schema<IClaim>({
  title: { type: String, required: true },
  dateOfLoss: { type: Date, required: true },
  createdDate: { type: Date, required: true }
});

export const Claim = model('Claim', claimSchema);
