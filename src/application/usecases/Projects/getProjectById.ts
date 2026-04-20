import { ProjectService } from "../../services/Project.serviceInstance";
import { ProjectAssignamentCoordinatorService } from "../../services/ProjectAassignamentCoordinator.serviceInstance";
import { CoordinatorService } from "../../services/Coordinator.serviceInstance";

export async function getProjectById(id: string) {
    const project = await ProjectService.traerProjectPorId(id);
    if (!project) return null;

    try {
        // Obtener asignaciones de coordinadores para este proyecto
        const assignments = await ProjectAssignamentCoordinatorService.listarCoordinatorDeProyecto(id);
        
        // Obtener detalles de cada coordinador
        const coordinators = await Promise.all(
            assignments.map(async (assignment) => {
                if (!assignment.idCoordinator) return null;
                const coordinator = await CoordinatorService.traerCoordinatorPorId(assignment.idCoordinator);
                return coordinator;
            })
        );

        // Retornar proyecto con sus coordinadores (filtrando posibles nulos)
        return {
            ...project,
            coordinators: coordinators.filter((c: any) => c !== null)
        };
    } catch (error) {
        console.error("Error al obtener coordinadores del proyecto:", error);
        // Retornar al menos los datos del proyecto si falla la carga de coordinadores
        return {
            ...project,
            coordinators: []
        };
    }
}