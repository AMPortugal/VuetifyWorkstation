import { connectDB } from './src/backend/config/database/conn.js';

async function testConnection() {
    try {
        await connectDB();
        console.log('Connection to the database was successful.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

testConnection();
  