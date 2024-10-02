import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000; // 4000

app.use(express.json()); // parser JSON request bodies
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on the port ${PORT}`);
	connectDB();
});
