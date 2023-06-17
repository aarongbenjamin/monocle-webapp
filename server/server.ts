import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import claims from './routes/claims';
import { connect } from 'mongoose';
// import { handleValidationErrors } from './util/handleValidationErrors';
dotenv.config({ path: './config.env' });

const app: express.Application = express();

const port: number = parseInt(process.env.PORT ?? '5000');
const mongoUrl = process.env.MONGO_URI ?? 'mongodb://localhost:27017';

app.use(cors());
app.use(express.json());
// app.use(handleValidationErrors)
app.use('/api/claims', claims);

// Server setup
app.listen(port, async () => {
  await connect(mongoUrl, {
    dbName: 'claims-management'
  });
  console.log('Successfully connected to MongoDB.');
});
