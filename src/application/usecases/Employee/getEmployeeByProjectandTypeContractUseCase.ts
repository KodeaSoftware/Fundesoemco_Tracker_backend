import { EmployeeService } from "../../services/Employee.serviceInstance"
import { ProjectService } from "../../services/Project.serviceInstance"

export async function getEmployeeByProjectandTypeContractUseCase(idProject: string, tipoContrato: number) {
    const employeeList = await EmployeeService.traerPorProyectoContrato(idProject, tipoContrato)

    return {
        DataEmployee: employeeList,
    }
}

