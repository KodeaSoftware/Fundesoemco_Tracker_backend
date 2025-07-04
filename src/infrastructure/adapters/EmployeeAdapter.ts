import { Employee } from "../../domain/models/Employee";
import { EmployeePort } from "../../domain/ports/EmployeePort";
import { EmployeeRepository } from "../repositories/Employee.repository";

export class EmployeeAdapter implements EmployeePort {

    // Instancia del repositorio para el adapter
    private repository = new EmployeeRepository()


    verificarPorCedula(cedula: number): Promise<boolean> {
        return this.repository.verificarPorCedula(cedula)
    }

    editarEmpleado(empleado: Employee): Promise<boolean> {
        return this.repository.editarEmpleado(empleado)
    }

    eliminarEmpleado(id: string): Promise<boolean> {
        return this.repository.eliminarEmpleado(id)
    }

    async crearEmpleado(empleado: Employee): Promise<boolean> {

        return await this.repository.crearEmpleado(empleado)
    }

    traerEmpleados(): Promise<Employee[]> {
        return this.repository.traerEmpleados()
    }
}