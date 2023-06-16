import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { check, param, ValidationChain } from 'express-validator';
import { Error as MongooseError } from 'mongoose';
import claimsService from '../services/claimsService';
import validateResults from '../util/validateResults';

export const startClaimValidations = [
  check(['title', 'dateOfLoss'])
    .notEmpty()
    .withMessage('Field cannot be empty'),
  check('dateOfLoss').isISO8601().withMessage('Invalid datetime format'),
  validateResults
];
export const startClaim = async (req: Request, res: Response) => {
  const { title, dateOfLoss } = req.body;
  const result = await claimsService.startClaim(title, dateOfLoss);

  if (result instanceof MongooseError.ValidationError) {
    res.status(HttpStatusCode.BadRequest);
    res.json(result);
  } else {
    res.json(result);
  }
};

export const getClaimByIdValidations = [param('claimId').notEmpty().isString()];
export const getClaim = async (req: Request, res: Response) => {
  const claimId = req.params?.claimId;

  const claim = await claimsService.getClaimById(claimId);

  if (claim) {
    res.status(HttpStatusCode.Ok).send(claim);
  } else {
    res.sendStatus(HttpStatusCode.NotFound);
  }
};

export const getClaims = async (req: Request, res: Response) => {
  const claims = await claimsService.getClaims();

  if (claims.length > 0) {
    res.json(claims);
  } else {
    res.sendStatus(HttpStatusCode.NoContent);
  }
};
