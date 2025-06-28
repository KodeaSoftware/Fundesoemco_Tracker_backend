import { RecursosHumanosService } from "../../services/RecursosHumanos.serviceInstance"

export async function deleteRecursosHumanosUseCase(id: string) {
    const eliminate = await RecursosHumanosService.eliminarRecursosHumanos(id)
    if (!eliminate) throw new Error(`Error al eliminar ${id}`)

    return {
        state: "Deleted",
        id: id
    }
} 