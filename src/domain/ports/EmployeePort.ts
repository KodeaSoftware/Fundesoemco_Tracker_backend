/**
 * Puerto para operaciones de empleados.
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 * @param cedula => número de cédula del empleado
 * @param empleado => objeto employee {cedula: 123, nombre: "juan"...}
 * @param id => uuid de cada empleado
 */

import { Employee } from '../models/Employee';


export interface EmployeePort {
    verificarPorCedula(cedula: number): Promise<boolean>;
    crearEmpleado(empleado: Employee): Promise<Employee>;
    eliminarEmpleado(id: string): Promise<boolean>;
    editarEmpleado(empleado: Employee): Promise<boolean>;
    traerEmpleados(): Promise<Employee[]>;
    traerPorCedula(cedula: number): Promise<Employee | null>;
    traerPorProyectoContrato(idProject: string, tipoContrato: number): Promise<Employee[]>
}


