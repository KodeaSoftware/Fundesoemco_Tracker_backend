import { EmailService } from "../../services/Email.serviceInstance";
import { Email } from "../../../domain/models/Email";

export async function sendPasswordEmailUseCase(correo: string, nombre: string, password: string) {
    try {
        // Crear instancia del modelo Email
        const email = new Email(correo, nombre, password);

        // Enviar correo usando el servicio
        const emailSent = await EmailService.enviarCorreoContraseña(email);

        if (!emailSent) {
            throw new Error("Error al enviar el correo electrónico");
        }

        return {
            status: "success",
            message: "Correo enviado exitosamente",
            data: {
                correo: email.correo,
                nombre: email.nombre,
                enviado: true
            }
        };

    } catch (error) {
        console.error('Error en sendPasswordEmailUseCase:', error);
        throw new Error(`Error al enviar correo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}
