import { Router } from 'express'
import { Schema, model } from 'mongoose';

const routes = Router();
interface IClaim {
    title: string,
    incidentDate: Date,
    createdDate: Date
}
const claimSchema = new Schema<IClaim>({
    title: { type: String, required: true },
    incidentDate: { type: Date, required: true },
    createdDate: { type: Date, required: true }
});

const Claim = model('Claim', claimSchema);

routes.post('/claims', async (req, res) => {
    const { title, incidentDate } = req.body;

    const claim = new Claim({
        title, incidentDate, createdDate: Date.now()
    });

    await claim.save();

    res.json(claim.toJSON());
});

export default routes;