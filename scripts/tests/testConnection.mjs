import { connectDB } from '../../src/backend/config/database/conn.js';

async function testConnection() {
    try {
        await connectDB();
        console.log('Connection to the database was successful.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    } finally {
        process.exit(0); // Fecha o processo Node.js
    }
}

// Chamando a função de teste de conexão e lidando com a promise
testConnection()
    .then(() => {
        console.log('Teste de conexão concluído.');
    })
    .catch((error) => {
        console.error('Erro ao executar o teste de conexão:', error);
    });
