/**
 * Puerto para operaciones de recursos humanos.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 * @param cedula => número de cédula del empleado
 * @param recursosHumanos => objeto recursosHumanos {cedula: 123, nombre: "juan"...}
 * @param id => uuid de cada recursosHumanos
 * @param password => contraseña del recursosHumanos
 */

import { RecursosHumanos } from "../models/RecursosHumanos";

export interface RecursosHumanosPort {
    verificarPorCedula(cedula: number): Promise<boolean>;
    crearRecursosHumanos(recursosHumanos: RecursosHumanos): Promise<boolean>;
    eliminarRecursosHumanos(id: string): Promise<boolean>;
    editarRecursosHumanos(recursosHumanos: RecursosHumanos): Promise<boolean>;
    traerRecursosHumanos(): Promise<RecursosHumanos[]>;
}
