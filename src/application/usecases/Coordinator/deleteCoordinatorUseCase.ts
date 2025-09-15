import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { ProjectAssignamentCoordinatorService } from "../../services/ProjectAassignamentCoordinator.serviceInstance";

export async function deleteCoordinatorUseCase(id: string) {

    // Primero eliminar las relaciones del coordinador con los proyectos
    const eliminarRelaciones = await ProjectAssignamentCoordinatorService.eliminarCoordinatorDeProyecto(id)
    if (!eliminarRelaciones) {
        console.warn(`No se encontraron relaciones de proyectos para el coordinador ${id}`)
    }

    // Luego eliminar el coordinador
    const eliminate = await CoordinatorService.eliminarCoordinator(id)
    if (!eliminate) throw new Error(`Error al eliminar ${id}`)

    return {
        state: "Deleted",
        id: id,
        message: "Coordinador y sus relaciones con proyectos eliminados correctamente"
    }
}

