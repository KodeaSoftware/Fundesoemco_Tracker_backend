/**
 * Puerto para operaciones de coordinadores .
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 * @param cedula => número de cédula del empleado
 * @param coordinator => objeto coordinator {cedula: 123, nombre: "juan"...}
 * @param id => uuid de cada coordinator
 * @param password => contraseña del coordinador
 */

import { Coordinator, CoordinatorDTO } from "../models/Coordinator";

export interface CoordinatorPort {
    verificarPorCedula(cedula: number): Promise<boolean>;
    crearCoordinator(coordinator: Coordinator): Promise<CoordinatorDTO>;
    eliminarCoordinator(id: string): Promise<boolean>;
    editarCoordinator(coordinator: Coordinator): Promise<boolean>;
    traerCoordinator(): Promise<CoordinatorDTO[]>;
    buscarPorEmail(correo: string): Promise<Coordinator>;
    verificarDuplicadosPorEmail(correo: string): Promise<boolean>
}


