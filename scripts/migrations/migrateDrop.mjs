import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
};

const migrateDrop = async () => {
    const connection = await mysql.createConnection(dbConfig);

    try {
        const [tables] = await connection.query('SHOW TABLES');
        if (tables.length === 0) {
            console.log('No tables found in the database.');
            return;
        }

        for (const row of tables) {
            const tableName = Object.values(row)[0];
            try {
                await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``);
                console.log(`Table ${tableName} dropped successfully.`);
            } catch (error) {
                console.error(`Error dropping table ${tableName}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(`Error fetching tables: ${error.message}`);
    } finally {
        await connection.end();
    }
};

migrateDrop()
    .then(() => {
        console.log('Migration drop completed successfully');
        return null; // Retorna um valor
    })
    .catch((error) => {
        console.error('Error in migration drop:', error);
        throw error; // Lança uma exceção
    });
