import { loginUseCase } from "../../application/usecases/auth/loginUseCase"
import { Request, Response } from "express";
import { CoordinatorService } from "../../application/services/Coordinator.serviceInstance";
import { RecursosHumanosService } from "../../application/services/RecursosHumanos.serviceInstance";
import { EmailService } from "../../application/services/Email.serviceInstance";
import bcrypt from "bcrypt";

// Almacenamiento temporal de códigos de reseteo (En memoria para simplicidad)
const resetCodes = new Map<string, string>();

export async function loginAdmin(req: Request, res: Response): Promise<void> {
    try {
        const { correo, password, role } = req.body
        const authData = await loginUseCase(correo, password, role)
        if (!authData) throw new Error("Failded auth" + correo)
        res.status(200).json(authData)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
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

        // Generar código de 6 dígitos
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        resetCodes.set(correo, code);

        // Enviar email
        const subject = "Código de Recuperación de Contraseña - Fundesoemco";
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #00BF40;">Recuperación de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña. Usa el siguiente código de verificación:</p>
                <div style="font-size: 24px; font-weight: bold; padding: 10px; background: #f4f4f4; text-align: center; border-radius: 5px; margin: 20px 0;">
                    ${code}
                </div>
                <p>Este código es válido por tiempo limitado. Si no solicitaste esto, ignora este mensaje.</p>
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

        const storedCode = resetCodes.get(correo);
        if (!storedCode || storedCode !== code) {
            res.status(400).json({ message: "Código inválido o expirado" });
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