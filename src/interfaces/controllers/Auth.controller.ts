import { loginUseCase } from "../../application/usecases/auth/loginUseCase"
import { Request, Response } from "express";
import { CoordinatorService } from "../../application/services/Coordinator.serviceInstance";
import { RecursosHumanosService } from "../../application/services/RecursosHumanos.serviceInstance";
import { EmailService } from "../../application/services/Email.serviceInstance";
import bcrypt from "bcrypt";

// Almacenamiento temporal de códigos de reseteo con expiración (10 minutos)
interface ResetCodeEntry {
    code: string;
    expiresAt: number;
}

const resetCodes = new Map<string, ResetCodeEntry>();
const RESET_CODE_TTL_MS = 10 * 60 * 1000; // 10 minutos

export async function loginAdmin(req: Request, res: Response): Promise<void> {
    try {
        const { correo, password, role } = req.body
        const authData = await loginUseCase(correo, password, role)
        if (!authData) throw new Error("Failed auth " + correo)
        res.status(200).json(authData)
    } catch (err) {
        res.status(500).send({ message: "Internal server error: " + err })
    }
}

export async function forgotPassword(req: Request, res: Response): Promise<void> {
    try {
        const { correo } = req.body;
        if (!correo) {
            res.status(400).json({ message: "El correo es requerido" });
            return;
        }

        // Buscar en ambas tablas
        const coordinador = await CoordinatorService.buscarPorEmail(correo);
        const rrhh = await RecursosHumanosService.buscarPorEmail(correo);

        const user = coordinador || rrhh;
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Generar código de 6 dígitos con tiempo de expiración
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        resetCodes.set(correo, {
            code,
            expiresAt: Date.now() + RESET_CODE_TTL_MS
        });

        // Enviar email
        const subject = "Código de Recuperación de Contraseña - Fundesoemco";
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #00BF40;">Recuperación de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña. Usa el siguiente código de verificación:</p>
                <div style="font-size: 24px; font-weight: bold; padding: 10px; background: #f4f4f4; text-align: center; border-radius: 5px; margin: 20px 0;">
                    ${code}
                </div>
                <p>Este código es válido por <strong>10 minutos</strong>. Si no solicitaste esto, ignora este mensaje.</p>
                <br>
                <p>Fundesoemco Software Team</p>
            </div>
        `;
        
        await EmailService.enviarEmail(correo, subject, html);
        res.status(200).json({ status: true, message: "Código enviado" });

    } catch (err) {
        console.error("Error en forgotPassword:", err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
    try {
        const { correo, code, newPassword } = req.body;
        if (!correo || !code || !newPassword) {
            res.status(400).json({ message: "Correo, código y nueva contraseña son requeridos" });
            return;
        }

        const entry = resetCodes.get(correo);
        if (!entry) {
            res.status(400).json({ message: "Código inválido o expirado" });
            return;
        }

        if (Date.now() > entry.expiresAt) {
            resetCodes.delete(correo);
            res.status(400).json({ message: "El código ha expirado. Por favor solicita uno nuevo." });
            return;
        }

        if (entry.code !== code) {
            res.status(400).json({ message: "Código incorrecto" });
            return;
        }

        // Buscar usuario
        const coordinador = await CoordinatorService.buscarPorEmail(correo);
        const rrhh = await RecursosHumanosService.buscarPorEmail(correo);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if (coordinador) {
            coordinador.password = hashedPassword;
            await CoordinatorService.editarCoordinator(coordinador);
        } else if (rrhh) {
            rrhh.password = hashedPassword;
            await RecursosHumanosService.editarRecursosHumanos(rrhh);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Limpiar código
        resetCodes.delete(correo);
        res.status(200).json({ status: true, message: "Contraseña actualizada exitosamente" });

    } catch (err) {
        console.error("Error en resetPassword:", err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getMe(req: Request, res: Response): Promise<void> {
    try {
        const correo = (req.query.correo as string) || (req.headers['x-user-email'] as string);
        if (!correo) {
            res.status(400).json({ message: "El correo es requerido" });
            return;
        }

        const coordinador = await CoordinatorService.buscarPorEmail(correo);
        if (coordinador) {
            res.status(200).json({
                nombre: coordinador.nombre,
                role: "coordinador",
                correo: coordinador.correo
            });
            return;
        }

        const rrhh = await RecursosHumanosService.buscarPorEmail(correo);
        if (rrhh) {
            res.status(200).json({
                nombre: rrhh.nombre,
                role: "rrhh",
                correo: rrhh.correo
            });
            return;
        }

        res.status(404).json({ message: "Usuario no encontrado" });
    } catch (err) {
        console.error("Error en getMe:", err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}