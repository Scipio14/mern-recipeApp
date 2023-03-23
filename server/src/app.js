import express from 'express';
import cors from 'cors';
import userRouter from './routes/users.routes.js';

const app = express();

app.set("port",5000);

app.use(express.json());
app.use(cors());

app.use('/auth',userRouter);

export default app;