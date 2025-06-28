import { EmployeeService } from "../../services/Employee.serviceInstance"
import { Employee } from "../../../domain/models/Employee"

export async function editEmployeeUseCase(employee: Employee) {
    const { cedula } = employee
    const isCreated = await EmployeeService.verificarPorCedula(cedula)
    if (!isCreated) throw new Error(`No existe un empleado con la cédula ${cedula} imposible editar`)

    const isUpdated = await EmployeeService.editarEmpleado(employee)
    if (!isUpdated) throw new Error("Error al actualizar el empleado" + cedula)

    return {
        state: "Updated",
        id: employee.id
    }
}