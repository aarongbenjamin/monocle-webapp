import { Router } from 'express';
import {
  getClaim,
  getClaims,
  getClaimByIdValidations,
  startClaim,
  updateClaimValidations,
  updateClaimById
} from '../controllers/claimsController';

const router = Router();

router.route('/').post(startClaim).get(getClaims);
router
  .route('/:claimId')
  .get(getClaimByIdValidations, getClaim)
  .put(updateClaimValidations, updateClaimById);

export default router;
