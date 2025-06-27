import { Employee } from "../../domain/models/Employee";
import { EmployeePort } from "../../domain/ports/EmployeePort";

export class EmployeeAdapter implements EmployeePort {
    verificarDuplicados(cedula: number): Promise<boolean> {

    }

    editarEmpleado(empleado: Employee): Promise<boolean> {

    }

    eliminarEmpleado(id: string): Promise<boolean> {

    }

    crearEmpleado(empleado: Employee): Promise<boolean> {

    }

    traerEmpleados(): Promise<[]> {

    }
}