import { Email } from "../../domain/models/Email";
import { EmailPort } from "../../domain/ports/EmailPort";
import { Resend } from 'resend';

export class EmailRepository implements EmailPort {

    private resend: Resend;

    constructor() {
        // Inicializar Resend con la API key desde variables de entorno
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async enviarCorreoContraseña(email: Email): Promise<boolean> {
        try {

            // Generar el mensaje usando el método del dominio
            const mensaje = email.generarMensaje();

            // Enviar el correo usando Resend API
            const { data, error } = await this.resend.emails.send({
                from: 'Fundesoemco <onboarding@resend.dev>', // Usando dominio por defecto de Resend
                to: [email.correo],
                subject: 'Credenciales de Acceso - Fundesoemco Attendance',
                text: mensaje,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #2c3e50; margin-bottom: 10px;">Fundesoemco Attendance</h1>
                            <p style="color: #7f8c8d; font-size: 16px;">Sistema de Asistencia</p>
                        </div>
                        
                        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                            <h2 style="color: #2c3e50; margin-bottom: 20px;">Hola ${email.nombre},</h2>
                            
                            <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                                Aquí están tus credenciales para acceder al sistema:
                            </p>
                            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #00BF40; margin-bottom: 20px;">
                                <p style="margin: 0; color: #2c3e50;"><strong>Contraseña:</strong> ${email.password}</p>
                                <p style="margin: 10px 0 0 0; color: #7f8c8d; font-size: 14px;">Rol: Coordinador</p>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://fundesoemcotrackerapp.up.railway.app/login" 
                                   style="background-color: #00BF40; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                    Acceder al Sistema
                                </a>
                            </div>
                            
                            <p style="color: #7f8c8d; font-size: 14px; text-align: center; margin-top: 30px;">
                                <strong>Fundesoemco Software, Automatizando procesos!</strong>
                            </p>
                        </div>
                        
                        <div style="text-align: center; color: #95a5a6; font-size: 12px; margin-top: 20px;">
                            <p>Este es un correo automático, por favor no responder.</p>
                        </div>
                    </div>
                `
            });

            if (error) {
                console.error('Error al enviar correo:', error);
                throw new Error(`Error al enviar correo: ${error.message}`);
            }

            console.log('Correo enviado exitosamente:', data);
            return true;

        } catch (error) {
            console.error('Error en EmailRepository:', error);
            throw new Error(`Error al enviar correo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }
}
