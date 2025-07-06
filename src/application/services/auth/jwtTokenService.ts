import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { env } from 'process';

// Clave secreta (idealmente en .env)
const SECRET_KEY: Secret = process.env.JWT_SECRET || ""


// Función para generar JWT
export async function generarToken(
    payload: string | object | Buffer,
): Promise<string> {
    console.log(SECRET_KEY)
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// Función para verificar JWT
export async function verificarToken(token: string): Promise<{ valido: true; datos: JwtPayload | string } | { valido: false; error: string }> {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return { valido: true, datos: decoded };
    } catch (error) {
        if (error instanceof Error) {
            return { valido: false, error: error.message };
        }
        return { valido: false, error: 'Error desconocido' };
    }
}
