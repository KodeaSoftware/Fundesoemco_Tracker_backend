import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// Clave secreta desde .env
const SECRET_KEY: Secret = process.env.JWT_SECRET || ""

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET no definido en .env — el servidor no puede arrancar sin clave secreta');
}

// Función para generar JWT
export async function generarToken(
    payload: string | object | Buffer,
): Promise<string> {
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
