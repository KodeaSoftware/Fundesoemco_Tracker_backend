import { loginUseCase } from "../../application/usecases/auth/loginUseCase"
import { Request, Response } from "express";

export async function loginAdmin(req: Request, res: Response) {
    try {
        const { correo, password, role } = req.body
        const authData = await loginUseCase(correo, password, role)
        if (!authData) throw new Error("Failded auth" + correo)
        res.status(200).json(authData)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}