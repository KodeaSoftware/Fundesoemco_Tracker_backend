import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { generarToken, verificarToken } from "../../services/auth/jwtTokenService";
import bcrypt from "bcrypt"

export async function loginCoordinatorUseCase(correo: string, password: string) {

    const coordinador = await CoordinatorService.buscarPorEmail(correo)

    const comparePassword = await bcrypt.compare(password, coordinador.password)
    if (!comparePassword) throw new Error("Contraseña incorrecta para" + correo)

    const token = await generarToken({ correo: correo })
    if (!token) throw new Error("Error al generar token")

    return {
        token: token,
        status: true,
        correo: correo
    }
}