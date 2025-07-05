import { EmployeeService } from "../../services/Employee.serviceInstance";

export async function getEmployeeByCedulaUseCase(cedula: number) {
    return await EmployeeService.traerPorCedula(cedula)
}