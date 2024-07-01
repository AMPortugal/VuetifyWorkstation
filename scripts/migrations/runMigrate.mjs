import { exec } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';

const timestamp = process.argv[2];
const migrationsDir = join(process.cwd(), 'src/backend/config/database/migrations');
const migrationFile = `${migrationsDir}/${timestamp}.mjs`;

if (existsSync(migrationFile)) {
    exec(`node ${migrationFile}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error executing migration ${timestamp}:`, err);
            return;
        }
        console.log(`Migration ${timestamp} output:`, stdout);
        if (stderr) {
            console.error(`Migration ${timestamp} error:`, stderr);
        }
    });
} else {
    console.error(`Migration file ${timestamp}.mjs not found.`);
}
