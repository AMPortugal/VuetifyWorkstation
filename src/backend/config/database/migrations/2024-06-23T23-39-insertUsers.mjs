import connection from '../conn.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const users = [
    { login: process.env.USER1_LOGIN, password: process.env.USER1_PASSWORD, email: process.env.USER1_EMAIL, role: process.env.USER1_ROLE },
    { login: process.env.USER2_LOGIN, password: process.env.USER2_PASSWORD, email: process.env.USER2_EMAIL, role: process.env.USER2_ROLE },
    { login: process.env.USER3_LOGIN, password: process.env.USER3_PASSWORD, email: process.env.USER3_EMAIL, role: process.env.USER3_ROLE },
];

const insertUsers = async () => {
    try {
        const sql = 'INSERT INTO users (login, password, email, role) VALUES (?, ?, ?, ?)';
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await connection.query(sql, [user.login, hashedPassword, user.email, user.role]);
        }
        console.log('Users inserted');
    } catch (error) {
        console.error('Error inserting users:', error.message);
    } finally {
        await connection.end();
    }
};

insertUsers()
    .then(() => console.log('Insert Users operation completed.'))
    .catch((error) => console.error('Error in insertUsers:', error.message));
