// src/backend/config/server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB, getConnection } from '../database/conn.js';
import routes from '../router/routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        await connectDB();

        app.post('/api/login', async (req, res) => {
            const { login, password } = req.body;
            const user = await findUserByLogin(login);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
                process.env.SECRET_KEY,
            );
            res.json({ token });
        });

        app.use('/api', routes);

        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process with an error code
    }
}

startServer()
    .then(() => {
        console.log('Server started successfully');
    })
    .catch((error) => {
        console.error('Failed to start the server:', error);
    });

async function findUserByLogin(login) {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE login = ?', [login]);
    return rows[0];
}
