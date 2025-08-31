import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { ProjectService } from "../../services/Project.serviceInstance";

export async function getAllCoordinatorUseCase() {
    const coordinatorList = await CoordinatorService.traerCoordinator()

    // Procesar cada coordinador para obtener los nombres de los proyectos
    const coordinatorListWithProjectNames = await Promise.all(
        coordinatorList.map(async (coordinator) => {
            // Obtener los proyectos con IDs y nombres para cada coordinador
            const projectsWithDetails = await Promise.all(
                coordinator.proyecto.map(async (projectId) => {
                    const project = await ProjectService.traerProjectPorId(projectId)
                    return {
                        id: projectId,
                        nombre: project ? project.titulo : 'Proyecto no encontrado'
                    }
                })
            )

            // Retornar el coordinador con los proyectos (IDs y nombres)
            return {
                ...coordinator,
                proyecto: projectsWithDetails // Mantener tanto IDs como nombres
            }
        })
    )
    return {
        Data: coordinatorListWithProjectNames
    }
}