import { spawn } from 'child_process';
import { readdirSync } from 'fs';
import { join } from 'path';

const migrationsDir = join(process.cwd(), 'src/backend/databases/migrations');

const runLatestMigration = () => {
    const migrationFiles = readdirSync(migrationsDir)
        .filter((file) => file.endsWith('.mjs'))
        .sort((a, b) => b.localeCompare(a));

    if (migrationFiles.length > 0) {
        const latestMigration = migrationFiles[0];
        console.log(`Running latest migration: ${latestMigration}`);
        const process = spawn('node', [join(migrationsDir, latestMigration)], { stdio: 'inherit' });

        process.on('close', (code) => {
            if (code === 0) {
                console.log(`Migration ${latestMigration} completed successfully.`);
            } else {
                console.error(`Migration ${latestMigration} failed with code ${code}.`);
            }
        });
    } else {
        console.log('No migration files found.');
    }
};

// Execute the latest migration script
runLatestMigration();
