import { redisClient } from '../../infrastructure/persistence/redis';

export class RedisService {

    /**
     * Establecer un valor en Redis con tiempo de expiración opcional
     * @param key - Clave del valor
     * @param value - Valor a almacenar
     * @param ttl - Tiempo de vida en segundos (opcional)
     */
    static async set(key: string, value: string, ttl?: number): Promise<void> {
        try {
            if (ttl) {
                await redisClient.setEx(key, ttl, value);
            } else {
                await redisClient.set(key, value);
            }
        } catch (error) {
            console.error('Error al establecer valor en Redis:', error);
            throw error;
        }
    }

    /**
     * Obtener un valor de Redis
     * @param key - Clave del valor
     * @returns Valor almacenado o null si no existe
     */
    static async get(key: string): Promise<string | null> {
        try {
            return await redisClient.get(key);
        } catch (error) {
            console.error('Error al obtener valor de Redis:', error);
            throw error;
        }
    }

    /**
     * Eliminar una clave de Redis
     * @param key - Clave a eliminar
     */
    static async del(key: string): Promise<void> {
        try {
            await redisClient.del(key);
        } catch (error) {
            console.error('Error al eliminar clave de Redis:', error);
            throw error;
        }
    }

    /**
     * Verificar si una clave existe en Redis
     * @param key - Clave a verificar
     * @returns true si existe, false si no
     */
    static async exists(key: string): Promise<boolean> {
        try {
            const result = await redisClient.exists(key);
            return result === 1;
        } catch (error) {
            console.error('Error al verificar existencia de clave en Redis:', error);
            throw error;
        }
    }

    /**
     * Establecer tiempo de expiración para una clave existente
     * @param key - Clave
     * @param ttl - Tiempo de vida en segundos
     */
    static async expire(key: string, ttl: number): Promise<void> {
        try {
            await redisClient.expire(key, ttl);
        } catch (error) {
            console.error('Error al establecer expiración en Redis:', error);
            throw error;
        }
    }

    /**
     * Obtener el tiempo de vida restante de una clave
     * @param key - Clave
     * @returns Tiempo restante en segundos, -1 si no tiene expiración, -2 si no existe
     */
    static async ttl(key: string): Promise<number> {
        try {
            return await redisClient.ttl(key);
        } catch (error) {
            console.error('Error al obtener TTL de Redis:', error);
            throw error;
        }
    }

    /**
     * Almacenar un objeto JSON en Redis
     * @param key - Clave del objeto
     * @param obj - Objeto a almacenar
     * @param ttl - Tiempo de vida en segundos (opcional)
     */
    static async setJSON(key: string, obj: any, ttl?: number): Promise<void> {
        try {
            const jsonString = JSON.stringify(obj);
            await this.set(key, jsonString, ttl);
        } catch (error) {
            console.error('Error al almacenar JSON en Redis:', error);
            throw error;
        }
    }

    /**
     * Obtener un objeto JSON de Redis
     * @param key - Clave del objeto
     * @returns Objeto parseado o null si no existe
     */
    static async getJSON(key: string): Promise<any | null> {
        try {
            const jsonString = await this.get(key);
            if (jsonString) {
                return JSON.parse(jsonString);
            }
            return null;
        } catch (error) {
            console.error('Error al obtener JSON de Redis:', error);
            throw error;
        }
    }

    /**
     * Incrementar un contador en Redis
     * @param key - Clave del contador
     * @param increment - Valor a incrementar (por defecto 1)
     * @returns Nuevo valor del contador
     */
    static async incr(key: string, increment: number = 1): Promise<number> {
        try {
            if (increment === 1) {
                return await redisClient.incr(key);
            } else {
                return await redisClient.incrBy(key, increment);
            }
        } catch (error) {
            console.error('Error al incrementar contador en Redis:', error);
            throw error;
        }
    }

    /**
     * Obtener todas las claves que coincidan con un patrón
     * @param pattern - Patrón de búsqueda (ej: "user:*")
     * @returns Array de claves que coinciden
     */

    static async keys(pattern: string): Promise<string[]> {
        try {
            return await redisClient.keys(pattern);
        } catch (error) {
            console.error('Error al obtener claves de Redis:', error);
            throw error;
        }
    }

    static async flushAll(): Promise<void> {
        try {
            await redisClient.flushAll();
        } catch (error) {
            console.error('Error al limpiar Redis:', error);
            throw error;
        }
    }
}
