import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

(async() => {
    const { default: connectDB } = await import('./config/db.js');

    await connectDB();

    app.use(cors());
    app.use(express.json());

    app.use('/api/sops', (await import('./routes/sopRoutes.js')).default);
    app.use('/api/ai', (await import('./routes/aiRoutes.js')).default);

    // Import and use the notifications route
    app.use('/api/notifications', (await import('./routes/notificationRoutes.js')).default);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
