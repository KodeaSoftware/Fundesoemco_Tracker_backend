import { Employee } from "../../domain/models/Employee";
import { EmployeePort } from "../../domain/ports/EmployeePort";
import { EmployeeModel } from "../persistence/models/EmployeeModel";
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

    async crearEmpleado(empleado: Employee): Promise<Employee> {

        return await this.repository.crearEmpleado(empleado)
    }

    traerEmpleados(): Promise<Employee[]> {
        return this.repository.traerEmpleados()
    }

    traerPorCedula(cedula: number): Promise<Employee | null> {
        return this.repository.traerPorCedula(cedula)
    }
}