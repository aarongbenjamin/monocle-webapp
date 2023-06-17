import { Router } from 'express';
import {
  getClaim,
  getClaims,
  getClaimByIdValidations,
  startClaim,
  startClaimValidations,
  updateClaimValidations,
  updateClaimById
} from '../controllers/claimsController';

const router = Router();

router.route('/').post(startClaimValidations, startClaim).get(getClaims);
router.get('/:claimId', getClaimByIdValidations, getClaim);
router.put('/:claimId', updateClaimValidations, updateClaimById);

export default router;
