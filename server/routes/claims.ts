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
router.get('/:claimId', getClaimByIdValidations, getClaim);
router.put('/:claimId', updateClaimValidations, updateClaimById);

export default router;
