import { readdirSync } from 'fs';
import { join } from 'path';
import { exec } from 'util';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: join(process.cwd(), '.env') });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
};

const migrationsDir = join(process.cwd(), 'src/backend/config/database/migrations');

async function testDatabaseConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('SELECT 1');
        await connection.end();
        console.log('Conexão com o banco de dados bem-sucedida.');
    } catch (error) {
        console.error('Erro ao conectar-se ao banco de dados:', error);
        process.exit(1); // Sair do script em caso de erro de conexão
    }
}

async function runMigration(filePath) {
    try {
        const { stdout, stderr } = await exec(`node ${filePath}`);
        if (stderr) {
            console.error(`Erro na migração ${filePath}: ${stderr}`);
        }
        return `Resultado da migração ${filePath}: ${stdout}`;
    } catch (err) {
        throw new Error(`Erro ao executar a migração ${filePath}: ${err}`);
    }
}

async function runAllMigrations() {
    try {
        const files = readdirSync(migrationsDir);
        files.sort();
        for (const file of files) {
            const filePath = join(migrationsDir, file);
            try {
                const result = await runMigration(filePath);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
    } catch (err) {
        console.error('Erro ao ler o diretório de migrações:', err);
    }
    return null; // Adicionado para garantir retorno de valor
}

async function main() {
    await testDatabaseConnection();
    await runAllMigrations();
}

main()
    .then(() => {
        console.log('Todas as migrações foram executadas com sucesso.');
        return null; // Adicionado para garantir retorno de valor
    })
    .catch((error) => {
        console.error('Erro ao executar migrações:', error);
        throw error; // Lança uma exceção
    });
