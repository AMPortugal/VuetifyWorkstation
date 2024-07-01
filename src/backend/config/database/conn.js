// src/backend/config/database/conn.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

export async function connectDB() {
    if (!connection) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        console.log('Connected to the MySQL database.');
    }
    return connection;
}

export async function getConnection() {
    if (!connection) {
        await connectDB();
    }
    return connection;
}
