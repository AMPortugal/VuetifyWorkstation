// src/backend/config/database/conn.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

export async function connectDB() {
    if (!connection) {
        try {
            console.log('Connecting to the database...');
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_BASE,
            });
            console.log('Connected to the MySQL database.');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
            throw error;
        }
    }
    return connection;
}

export async function getConnection() {
    if (!connection) {
        await connectDB();
    }
    return connection;
}
