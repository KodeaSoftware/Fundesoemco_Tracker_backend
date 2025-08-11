import { EmployeeService } from "../../services/Employee.serviceInstance"


export async function getEmployeeByProjectandTypeContractUseCase(idProject: string, tipoContrato: number) {
    const employeeList = await EmployeeService.traerPorProyectoContrato(idProject, tipoContrato)

    return {
        DataEmployee: employeeList,
    }
}

