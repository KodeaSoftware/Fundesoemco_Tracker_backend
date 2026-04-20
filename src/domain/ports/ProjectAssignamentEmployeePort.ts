/**
 * Puerto para operaciones de proyectos.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 */

import { ProjectAssignamentEmployee } from "../models/ProjectAssignamentEmployee";

export interface ProjectAssignamentEmployeePort {
    asignarProyecto(ProjectAssignament: ProjectAssignamentEmployee): Promise<boolean>
    eliminarEmpleadoDeProyecto(idEmployee: string): Promise<boolean>
    listarEmpleadosDeProyecto(idProject: string): Promise<ProjectAssignamentEmployee[]>
    reasignarEmpleadosDeProyecto(oldProjectId: string, newProjectId: string): Promise<boolean>
    vaciarEmpleadosDeProyecto(idProject: string): Promise<boolean>
} 