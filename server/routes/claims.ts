import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import { Router } from 'express';
import { Schema, model, Error, Types, Document, ObjectId } from 'mongoose';

const router = Router();
interface IClaim {
  title: string;
  dateOfLoss: Date;
  createdDate: Date;
}
const claimSchema = new Schema<IClaim>({
  title: { type: String, required: true },
  dateOfLoss: { type: Date, required: true },
  createdDate: { type: Date, required: true }
});

const Claim = model('Claim', claimSchema);

router
  .route('/')
  .post(async (req, res) => {
    const { title, dateOfLoss } = req.body;

    const claim = new Claim({
      title,
      dateOfLoss,
      createdDate: Date.now()
    });
    const validationError = claim.validateSync();
    if (validationError) {
      res.status(HttpStatusCode.BadRequest);
      res.json(validationError);
    } else {
      const newClaimDocument = await claim.save();
      const newClaim = newClaimDocument.toObject<IClaim>();

      res.json(newClaim);
    }
  })
  .get(async (req, res) => {
    const claims = await Claim.find();

    res.json(
      claims
        .map((claim) => {
          return claim.toJSON();
        })
        .sort((a, b) => {
          const firstDate = dayjs(a.createdDate);
          const secondDate = dayjs(b.createdDate);
          return firstDate.isSame(secondDate)
            ? 0
            : firstDate.isAfter(secondDate)
            ? -1
            : 1;
        })
    );
  });
router.get('/:claimId', async (req, res) => {
  const claimId = req.params.claimId;
  let document:
    | (Document<ObjectId, {}, IClaim> &
        Omit<
          IClaim & {
            _id: Types.ObjectId;
          },
          never
        >)
    | null = null;

  try {
    document = await Claim.findById(claimId);
  } catch (error) {
    if (!(error instanceof Error.CastError)) {
      throw error;
    }
  }

  if (document) {
    res.status(HttpStatusCode.Ok).send(document.toJSON());
  } else {
    res.sendStatus(HttpStatusCode.NotFound);
  }
});

export default router;
