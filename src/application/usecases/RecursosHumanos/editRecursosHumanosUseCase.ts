import { RecursosHumanosService } from "../../services/RecursosHumanos.serviceInstance"
import { RecursosHumanos } from "../../../domain/models/RecursosHumanos"

export async function editRecursosHumanosUseCase(recursosHumanos: RecursosHumanos) {
    const { cedula } = recursosHumanos
    const isCreated = await RecursosHumanosService.verificarPorCedula(cedula)
    if (!isCreated) throw new Error(`No existe un recurso humano con la cédula ${cedula} imposible editar`)

    const isUpdated = await RecursosHumanosService.editarRecursosHumanos(recursosHumanos)
    if (!isUpdated) throw new Error("Error al actualizar el recurso humano" + cedula)

    return {
        state: "Updated",
        id: recursosHumanos.id
    }
} 