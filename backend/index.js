import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';

import userRoutes from './Routes/userRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

