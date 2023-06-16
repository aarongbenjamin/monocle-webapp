export interface INewClaimRequest {
  title: string;
  dateOfLoss: Date;
}

export interface IClaim {
  _id: string;
  title: string;
  createdDate: Date;
  dateOfLoss: Date;
}
