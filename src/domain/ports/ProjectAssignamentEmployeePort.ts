/**
 * Puerto para operaciones de proyectos.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 */

import { ProjectAssignamentEmployee } from "../models/ProjectAssignamentEmployee";

export interface ProjectAssignamentEmployeePort {
    asignarProyecto(idPorject: string | null, idEmployee: string | undefined): Promise<boolean>
    eliminarEmpleadoDeProyecto(idEmployee: string): Promise<boolean>
    listarEmpleadosDeProyecto(idPorject: string): Promise<ProjectAssignamentEmployee[]>
} 