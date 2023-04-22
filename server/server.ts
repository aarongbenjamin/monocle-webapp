import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import claimRoutes from './routes/claims'
dotenv.config({ path: './config.env'});

const app: express.Application = express();

const port: number = parseInt(process.env.PORT ?? "5000");

app.use(cors());
app.use(express.json());
app.use('/api', claimRoutes);

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
});