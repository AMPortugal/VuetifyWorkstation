import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { join } from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: join(process.cwd(), '.env') });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
};

async function testConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('SELECT 1');
        await connection.end();
        console.log('Conexão com o banco de dados bem-sucedida.');
    } catch (error) {
        console.error('Erro ao conectar-se ao banco de dados:', error);
        throw error;
    }
}

testConnection()
    .then(() => {
        console.log('Test connection completed successfully.');
        return null; // Retorna um valor
    })
    .catch((error) => {
        console.error('Erro ao testar conexão:', error);
        throw error; // Lança uma exceção
    });
