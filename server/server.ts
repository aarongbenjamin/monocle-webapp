import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import claims from './routes/claims';
import { connect } from 'mongoose';
import path from 'path';
// import { handleValidationErrors } from './util/handleValidationErrors';
dotenv.config({ path: './config.env' });

const app: express.Application = express();
const env = process.env.ENVIRONMENT ?? 'dev';
const port: number = parseInt(process.env.PORT ?? '5000');
const mongoUrl = process.env.MONGO_URI ?? 'mongodb://localhost:27017';

if (!env.includes('local')) {
  console.log('attempting to expose public assets');
  app.use(express.static(path.join(__dirname, 'public')));
}

app.use(cors());
app.use(express.json());
// app.use(handleValidationErrors)
app.use('/api/claims', claims);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Server setup
app.listen(port, async () => {
  await connect(mongoUrl, {
    dbName: 'monocle'
  });
  console.log('Successfully connected to MongoDB.');
  console.log('listening on port', port);
});
