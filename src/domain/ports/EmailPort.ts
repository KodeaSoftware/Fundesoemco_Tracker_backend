import { Email } from "../models/Email";

/**
 * Puerto para operaciones de envío de correos.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 */
export interface EmailPort {
    enviarCorreoContraseña(email: Email): Promise<boolean>;
    enviarEmail(to: string, subject: string, html: string): Promise<boolean>;
}
