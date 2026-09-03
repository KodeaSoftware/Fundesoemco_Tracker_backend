import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../../application/services/auth/jwtTokenService';

/**
 * Middleware de autenticación JWT.
 * Verifica que el request tenga un token válido en el header Authorization.
 * Formato esperado: "Bearer <token>"
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Token de autenticación requerido' });
            return;
        }

        const token = authHeader.split(' ')[1];

        const resultado = await verificarToken(token);

        if (!resultado.valido) {
            res.status(401).json({ message: 'Token inválido o expirado' });
            return;
        }

        // Adjuntar datos del usuario al request para uso posterior
        (req as any).user = resultado.datos;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Error de autenticación' });
    }
}
