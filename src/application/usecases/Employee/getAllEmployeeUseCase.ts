import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectService } from "../../services/Project.serviceInstance";
import { EmploymentContractService } from "../../services/EmploymentContract.serviceInstance";

export async function getAllEmployeeUseCase() {

    const employeeList = await EmployeeService.traerEmpleados()

    // Procesar cada empleado para obtener los nombres de los proyectos y el tipo de contrato
    const employeeListWithProjectNames = await Promise.all(
        employeeList.map(async (employee) => {
            // Obtener los nombres de los proyectos para cada empleado
            const projectNames = await Promise.all(
                employee.proyecto.map(async (projectId) => {
                    const project = await ProjectService.traerProjectPorId(projectId)
                    return project ? project.titulo : 'Proyecto no encontrado'
                })
            )

            // Obtener el nombre del tipo de contrato
            const tipoContrato = await EmploymentContractService.obtenerTipoContratoPorId(employee.contrato)
            const nombreTipoContrato = tipoContrato ? tipoContrato.contract_type : 'Tipo de contrato no encontrado'

            // Retornar el empleado con los nombres de los proyectos y el tipo de contrato
            return {
                ...employee,
                proyecto: projectNames, // Reemplazar los IDs con los nombres
                tipoContrato: nombreTipoContrato // Agregar el nombre del tipo de contrato
            }
        })
    )

    return {
        Data: employeeListWithProjectNames
    }
}