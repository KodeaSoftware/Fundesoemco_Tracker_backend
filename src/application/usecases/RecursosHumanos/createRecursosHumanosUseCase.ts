import { RecursosHumanosService } from "../../services/RecursosHumanos.serviceInstance";
import { RecursosHumanos } from "../../../domain/models/RecursosHumanos";
import bcrypt from "bcrypt"

export async function createRecursosHumanosUseCase(recursosHumanos: RecursosHumanos) {
    const { cedula, password } = recursosHumanos
    const isCreated = await RecursosHumanosService.verificarPorCedula(cedula)
    if (isCreated) throw new Error(`Ya existe un recurso humano con la cédula ${cedula}`)

    const hashedPassword = await bcrypt.hash(password, 10)
    recursosHumanos.password = hashedPassword

    const recursosHumanosCreated = await RecursosHumanosService.crearRecursosHumanos(recursosHumanos)
    if (!recursosHumanosCreated) throw new Error("Error al crear el recurso humano")

    return {
        status: "Created",
        id: recursosHumanos.id,
        cc: recursosHumanos.cedula,
        name: recursosHumanos.nombre
    }
} 