import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { RecursosHumanosService } from "../../services/RecursosHumanos.serviceInstance"
import { generarToken } from "../../services/auth/jwtTokenService";
import bcrypt from "bcrypt"

export async function loginUseCase(correo: string, password: string, role: string) {

    if (role === "coordinador") {
        const coordinador = await CoordinatorService.buscarPorEmail(correo)

        const comparePassword = await bcrypt.compare(password, coordinador.password)
        if (!comparePassword) throw new Error("Contraseña incorrecta para" + correo)

        const token = await generarToken({ correo: correo })
        if (!token) throw new Error("Error al generar token")

        if (role != "coordinador") throw new Error("Error en el rol del admin")
        return {
            token: token,
            status: true,
            correo: correo,
            role: role
        }
    }

    if (role === "rrhh") {
        const rrhh = await RecursosHumanosService.buscarPorEmail(correo)

        const comparePassword = await bcrypt.compare(password, rrhh.password)
        if (!comparePassword) throw new Error("Contraseña incorrecta para" + correo)

        const token = await generarToken({ correo: correo })
        if (!token) throw new Error("Error al generar token")

        if (role != "rrhh") throw new Error("Error en el rol del admin")

        return {
            token: token,
            status: true,
            correo: correo,
            role: role
        }
    }

}