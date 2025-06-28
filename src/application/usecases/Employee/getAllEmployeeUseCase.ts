import { EmployeeService } from "../../services/Employee.serviceInstance";

export async function getAllEmployeeUseCase() {
    const employeeList = await EmployeeService.traerEmpleados()

    return {
        Data: employeeList
    }
}