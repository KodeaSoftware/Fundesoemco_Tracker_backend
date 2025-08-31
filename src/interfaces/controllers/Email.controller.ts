import { sendPasswordEmailUseCase } from "../../application/usecases/Email/sendPasswordEmailUseCase";
import { Request, Response, NextFunction } from "express";

export async function sendPasswordEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const { correo, nombre, password } = req.body;

        // Validar que se envíen todos los parámetros requeridos
        if (!correo || !nombre || !password) {
            return res.status(400).json({
                status: "error",
                message: "Faltan parámetros requeridos: correo, nombre, password"
            });
        }

        console.log(`Enviando correo a: ${correo} para: ${nombre}`);

        const result = await sendPasswordEmailUseCase(correo, nombre, password);

        res.status(200).json(result);

    } catch (err) {
        console.error('Error en sendPasswordEmail controller:', err);
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
            error: err instanceof Error ? err.message : "Error desconocido"
        });
    }
}
