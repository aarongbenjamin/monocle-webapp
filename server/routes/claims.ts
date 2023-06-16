import { Router } from 'express';
import {
  getClaim,
  getClaims,
  getClaimByIdValidations,
  startClaim,
  startClaimValidations
} from '../controllers/claimsController';

const router = Router();

router.route('/').post(startClaimValidations, startClaim).get(getClaims);
router.get('/:claimId', getClaimByIdValidations, getClaim);

export default router;
