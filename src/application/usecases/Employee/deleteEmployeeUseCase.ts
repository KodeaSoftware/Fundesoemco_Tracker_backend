import { EmployeeService } from "../../services/Employee.serviceInstance"

export async function deleteEmployeeUseCase(id: string) {

    const eliminate = await EmployeeService.eliminarEmpleado(id)
    if (!eliminate) throw new Error(`Error al eliminar ${id}`)

    return {
        state: "Deleted",
        id: id
    }
}

