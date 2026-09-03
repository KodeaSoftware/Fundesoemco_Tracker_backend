import { Client } from 'pg';
import 'dotenv/config';

export async function ensureDatabaseExists() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL no está definido en .env');
    }

    try {
        const parsedUrl = new URL(databaseUrl);
        const user = decodeURIComponent(parsedUrl.username);
        const password = decodeURIComponent(parsedUrl.password);
        const host = parsedUrl.hostname;
        const port = parsedUrl.port ? parseInt(parsedUrl.port, 10) : 5432;
        const dbName = parsedUrl.pathname.replace(/^\//, '');

        if (!user || !host || !dbName) {
            return;
        }

        // Conectar a la base de datos 'postgres' predeterminada para crear la base de datos deseada
        const client = new Client({
            user,
            password,
            host,
            port,
            database: 'postgres'
        });

        try {
            await client.connect();
            const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
            
            if (res.rowCount === 0) {
                console.log(`La base de datos ${dbName} no existe. Creándola...`);
                await client.query(`CREATE DATABASE ${dbName}`);
                console.log(`Base de datos ${dbName} creada exitosamente.`);
            } else {
                console.log(`La base de datos ${dbName} ya existe.`);
            }
        } catch (error) {
            console.error('Error al verificar/crear la base de datos:', error);
        } finally {
            await client.end();
        }
    } catch (error) {
        console.error('Error al procesar la URL de la base de datos:', error);
    }
}
