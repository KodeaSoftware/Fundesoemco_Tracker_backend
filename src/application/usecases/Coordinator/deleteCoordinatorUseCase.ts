import { CoordinatorService } from "../../services/Coordinator.serviceInstance";

export async function deleteCoordinatorUseCase(id: string) {

    const eliminate = await CoordinatorService.eliminarCoordinator(id)
    if (!eliminate) throw new Error(`Error al eliminar ${id}`)

    return {
        state: "Deleted",
        id: id
    }
}

