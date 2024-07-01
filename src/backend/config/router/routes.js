// src/backend/config/router/routes.js
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

export default router;
