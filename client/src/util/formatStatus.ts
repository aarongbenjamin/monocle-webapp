import { ClaimStatus } from '../models/claim';

export function formatStatus(status: ClaimStatus | undefined) {
  switch (status) {
    case ClaimStatus.UnderInvestigation:
      return 'Under Investigation';
    case ClaimStatus.ReadyForCollection:
      return 'Ready for Collection';
    case ClaimStatus.AttemptingCollection:
      return 'Attempting Collection';
    case ClaimStatus.PaidInFull:
      return 'Paid in Full';
    default:
      return 'N/A';
  }
}
