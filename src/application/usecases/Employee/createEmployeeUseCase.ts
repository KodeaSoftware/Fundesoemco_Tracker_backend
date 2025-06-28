import { EmployeeService } from "../../services/Employee.serviceInstance";
import { Employee } from "../../../domain/models/Employee";


export async function createEmployeeUseCase(employee: Employee) {

    const { cedula } = employee
    const isCreated = await EmployeeService.verificarPorCedula(cedula)
    if (isCreated) throw new Error(`Ya existe un empleado con la cédula ${cedula}`)

    const employeeCreated = await EmployeeService.crearEmpleado(employee)
    if (!employeeCreated) throw new Error("Error al crear el empleado")


    return {
        status: "Created",
        id: employee.id,
        cc: employee.cedula,
        name: employee.nombre
    }
}