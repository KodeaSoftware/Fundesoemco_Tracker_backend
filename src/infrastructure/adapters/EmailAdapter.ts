import { Email } from "../../domain/models/Email";
import { EmailPort } from "../../domain/ports/EmailPort";
import { EmailRepository } from "../repositories/Email.repository";

export class EmailAdapter implements EmailPort {

    // Instancia del repositorio para el adapter
    private repository = new EmailRepository()

    enviarCorreoContraseña(email: Email): Promise<boolean> {
        return this.repository.enviarCorreoContraseña(email)
    }
}
