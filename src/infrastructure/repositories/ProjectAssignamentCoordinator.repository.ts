import { ProjectAssignamentCoordinator } from "../../domain/models/ProjectAssignamentCoordinator";
import { ProjectAssignamentCoordinatorModel } from "../persistence/models/ProjectAssignamentCoordinatorModel";
import { ProjectAssignamentCoordinatorPort } from "../../domain/ports/ProjectAssignamentCoordinatorPort";

export class ProjectAssignamentCoordinatorRepository implements ProjectAssignamentCoordinatorPort {

    async asignarProyecto(ProjectAssignament: ProjectAssignamentCoordinator): Promise<boolean> {
        const { id, ...ProjectAssignamentData } = ProjectAssignament
        try {
            await ProjectAssignamentCoordinatorModel.create(ProjectAssignamentData);
            return true;
        } catch (error) {
            throw new Error("Error al asignar proyecto: " + error);
        }
    }

    async eliminarCoordinatorDeProyecto(idCoordinator: string): Promise<boolean> {
        const deleted = await ProjectAssignamentCoordinatorModel.destroy({ where: { idCoordinator } })
        return deleted > 0
    }

    async listarCoordinatorDeProyecto(idProject: string): Promise<ProjectAssignamentCoordinator[]> {
        const asignaciones = await ProjectAssignamentCoordinatorModel.findAll({
            where: { idProject }
        });
        return asignaciones.map(a => new ProjectAssignamentCoordinator(
            a.getDataValue('idProject'),
            a.getDataValue('idCoordinator'),
        ));
    }
}