import connection from './src/backend/config/database/conn.js';
// Adiciona logs para depuração
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_BASE:', process.env.DB_BASE);
const testConnection = async () => {
    try {
        const [rows] = await connection.query('SELECT 1');
        console.log('Conexão bem-sucedida:', rows);
    } catch (error) {
        console.error('Erro ao conectar-se ao banco de dados:', error);
    }
};

// Chamando a função de teste de conexão e lidando com a promise
testConnection()
    .then(() => {
        console.log('Teste de conexão concluído.');
    })
    .catch((error) => {
        console.error('Erro ao executar o teste de conexão:', error);
    });
