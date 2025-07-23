import { ProjectAssignamentCoordinator } from "../../domain/models/ProjectAssignamentCoordinator";
import { ProjectAssignamentCoordinatorModel } from "../persistence/models/ProjectAssignamentCoordinatorModel";
import { ProjectAssignamentCoordinatorPort } from "../../domain/ports/ProjectAssignamentCoordinatorPort";
import { ProjectAssignamentCoordinatorRepository } from "../repositories/ProjectAssignamentCoordinator.repository";

export class ProjectAssignamentCoordinatorAdapter implements ProjectAssignamentCoordinatorPort {

    private repository = new ProjectAssignamentCoordinatorRepository()

    eliminarCoordinatorDeProyecto(idCoordinator: string): Promise<boolean> {
        return this.repository.eliminarCoordinatorDeProyecto(idCoordinator)
    }

    asignarProyecto(ProjectAssignament: ProjectAssignamentCoordinator): Promise<boolean> {
        return this.repository.asignarProyecto(ProjectAssignament)
    }

    listarCoordinatorDeProyecto(idPorject: string): Promise<ProjectAssignamentCoordinator[]> {
        return this.repository.listarCoordinatorDeProyecto(idPorject)
    }
}