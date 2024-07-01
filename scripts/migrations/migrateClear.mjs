import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
};

const clearAllTables = async () => {
    const connection = await mysql.createConnection(dbConfig);

    try {
        // Obtém todas as tabelas no banco de dados
        const [tables] = await connection.query(`SHOW TABLES`);
        const tableNames = tables.map((row) => Object.values(row)[0]);

        // Limpa todas as tabelas
        for (const tableName of tableNames) {
            await connection.query(`TRUNCATE TABLE \`${tableName}\``);
            console.log(`Table ${tableName} cleared.`);
        }
    } catch (error) {
        console.error('Error clearing tables:', error.message);
    } finally {
        await connection.end();
    }
};

clearAllTables()
    .then(() => console.log('Clear All Tables operation completed.'))
    .catch((error) => console.error('Error in clearAllTables:', error.message));
