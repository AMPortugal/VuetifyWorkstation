import connection from '../conn.js';

const createUsersTable = async () => {
    try {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                password VARCHAR(100),
                login VARCHAR(50) UNIQUE,
                role VARCHAR(50),
                active BOOLEAN DEFAULT true,
                last_login TIMESTAMP
            )
        `;
        await connection.query(sql);
        console.log('Users table created');
    } catch (error) {
        console.error('Error creating Users table:', error.message);
    } finally {
        await connection.end();
    }
};

createUsersTable()
    .then(() => console.log('Create Users Table operation completed.'))
    .catch((error) => console.error('Error in createUsersTable:', error.message));
