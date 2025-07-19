/**
 * Puerto para operaciones de proyectos.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 */

import { ProjectAssignamentEmployee } from "../models/ProjectAssignamentEmployee";

export interface ProjectAssignamentEmployeePort {
    asignarProyecto(ProjectAssignament: ProjectAssignamentEmployee): Promise<boolean>
    eliminarEmpleadoDeProyecto(idEmployee: string): Promise<boolean>
    listarEmpleadosDeProyecto(idPorject: string): Promise<ProjectAssignamentEmployee[]>
} 