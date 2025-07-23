import { ProjectAssignamentCoordinator } from "../../domain/models/ProjectAssignamentCoordinator";
import { ProjectAssignamentCoordinatorModel } from "../persistence/models/ProjectAssignamentCoordinatorModel";
import { ProjectAssignamentCoordinatorPort } from "../../domain/ports/ProjectAssignamentCoordinatorPort";

export class ProjectAssignamentCoordinatorRepository implements ProjectAssignamentCoordinatorPort {

    async asignarProyecto(ProjectAssignament: ProjectAssignamentCoordinator): Promise<boolean> {
        const { ...ProjectAssignamentData } = ProjectAssignament
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

    async listarCoordinatorDeProyecto(idPorject: string): Promise<ProjectAssignamentCoordinator[]> {
        const asignaciones = await ProjectAssignamentCoordinatorModel.findAll({
            where: { idPorject }
        });
        return asignaciones.map(a => new ProjectAssignamentCoordinator(
            a.getDataValue('idPorject'),
            a.getDataValue('idCoordinator'),
        ));
    }
}