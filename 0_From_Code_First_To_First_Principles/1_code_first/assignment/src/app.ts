import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api';

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRoutes);

export default app;