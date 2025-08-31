import { sendPasswordEmail } from "../controllers/Email.controller";
import { Router } from "express";

const EmailRoute = Router();

// Ruta para enviar correo con contraseña
EmailRoute.post("/api/email/send-password", (req, res, next) => {
    sendPasswordEmail(req, res, next).catch(next);
});

export default EmailRoute
