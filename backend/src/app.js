import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import auth from './routes/auth.js';
import db from './config/db.js';
import { Config } from './config/index.js';

const app = express();
const corsOptions = {
    origin: Config.FRONTEND_URL, // Replace with your frontend's URL
    credentials: true, // Allows cookies to be sent and received
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(helmet());

app.use("/api/auth", auth);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
