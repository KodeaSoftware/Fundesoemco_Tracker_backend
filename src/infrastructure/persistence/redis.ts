import { createClient } from 'redis';
import 'dotenv/config';

// Configuración de Redis con fallback
const REDIS_URL = process.env.REDIS || 'redis://localhost:6379';

// Crear cliente de Redis
export const redisClient = createClient({
    url: REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.log('Máximo número de reintentos de Redis alcanzado');
                return false;
            }
            console.log(`Reintentando conexión a Redis (intento ${retries})`);
            return Math.min(retries * 100, 3000);
        }
    }
});

// Manejar eventos de conexión
redisClient.on('error', (err: any) => {
    console.error('Error de Redis:', err.message);
    // No lanzar error para evitar que la aplicación se detenga
});

redisClient.on('connect', () => {
    console.log('Conectado a Redis');
});

redisClient.on('ready', () => {
    console.log('Redis listo para usar');
});

redisClient.on('end', () => {
    console.log('Conexión a Redis cerrada');
});


// Función para conectar a Redis
export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Conexión a Redis establecida exitosamente');
    } catch (error: any) {
        console.error('Error al conectar a Redis:', error.message);
        console.log('Para desarrollo local, asegúrate de tener Redis instalado y ejecutándose');
        console.log('O configura la variable de entorno REDIS con una URL válida');

    }
};

// Función para desconectar de Redis
export const disconnectRedis = async () => {
    try {
        await redisClient.quit();
        console.log('Desconectado de Redis');
    } catch (error: any) {
        console.error('Error al desconectar de Redis:', error.message);
    }
};
