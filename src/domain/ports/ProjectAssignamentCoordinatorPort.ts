/**
 * Puerto para operaciones de proyectos.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 */

import { ProjectAssignamentCoordinator } from "../models/ProjectAssignamentCoordinator"

export interface ProjectAssignamentCoordinatorPort {
    asignarProyecto(ProjectAssignament: ProjectAssignamentCoordinator): Promise<boolean>
    eliminarCoordinatorDeProyecto(idCoordinator: string): Promise<boolean>
    listarCoordinatorDeProyecto(idPorject: string): Promise<ProjectAssignamentCoordinator[]>
}