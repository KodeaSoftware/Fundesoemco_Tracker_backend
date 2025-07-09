/**
 * Puerto para operaciones de proyectos.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 * @param titulo => título del proyecto
 * @param descripcion => descripción del proyecto
 * @param creadoEn => fecha de creación del proyecto
 * @param coordinadores => array de coordinadores del proyecto
 * @param empleadosDirectos => array de empleados directos del proyecto
 * @param contratistas => array de contratistas del proyecto
 * @param id => uuid de cada proyecto
 * @param horaEntrada y @param horaSalida => horarios de jornada de proyecto 
 * @param jornada => almacena hora de llegada y hora de salida 
 */

import { Project } from "../models/Project";

export interface ProjectPort {
    verificarPorTitulo(titulo: string): Promise<boolean>;
    crearProject(project: Project): Promise<boolean>;
    eliminarProject(id: string): Promise<boolean>;
    editarProject(project: Project): Promise<boolean>;
    traerProject(): Promise<Project[]>;
    traerProjectPorId(id: string): Promise<Project | null>;
} 