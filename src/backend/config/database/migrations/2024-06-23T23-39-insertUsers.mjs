import connection from '../conn.js';
import bcrypt from 'bcrypt';

const users = [
    { login: 'adriano', password: '#OpRBNox24', email: 'operacional@rbnoxmoveis.com.br', role: 'Diretor Operacional' },
    { login: 'rodolpho', password: '#ComRBNox24', email: 'comercial@rbnoxmoveis.com.br', role: 'Diretor Comercial' },
    { login: 'adm', password: '#AdmRBNox24', email: 'contato@rbnoxmoveis.com.br', role: 'Atendimento' },
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
