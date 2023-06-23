export interface INewClaimRequest {
  title?: string;
  dateOfLoss?: Date;
}
export type AdverseParty = {
  name?: string;
  phoneNumber?: string;
  email?: string;
  address?: {
    addressLine1?: string;
    addressLine2?: string;
    unit?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  insurance?: {
    companyName?: string;
    adjustorName?: string;
    phoneNumber?: string;
    email?: string;
  };
};

export type Facility = {
  type?: string;
  repairCost?: string;
  description?: string;
};

export interface IClaim {
  _id: string;
  title: string;
  dateOfLoss: Date;
  createdDate: Date;
  lastUpdatedDate: Date;
  facilities?: Facility[];
  adverseParty?: AdverseParty;
  status: ClaimStatus;
}
export enum ClaimStatus {
  UnderInvestigation = 'UnderInvestigation',
  ReadyForCollection = 'ReadyForCollection',
  AttemptingCollection = 'AttemptingCollection',
  PaidInFull = 'PaidInFull'
}
