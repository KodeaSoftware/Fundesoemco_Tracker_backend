import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectService } from "../../services/Project.serviceInstance";
import { EmploymentContractService } from "../../services/EmploymentContract.serviceInstance";

export async function getAllEmployeeUseCase() {

    const employeeList = await EmployeeService.traerEmpleados()

    // Procesar cada empleado para obtener los nombres de los proyectos y el tipo de contrato
    const employeeListWithProjectNames = await Promise.all(
        employeeList.map(async (employee) => {
            // Obtener los proyectos con IDs y nombres para cada empleado
            const projectsWithDetails = await Promise.all(
                employee.proyecto.map(async (projectId) => {
                    const project = await ProjectService.traerProjectPorId(projectId)
                    return {
                        id: projectId,
                        nombre: project ? project.titulo : 'Proyecto no encontrado'
                    }
                })
            )

            // Obtener el nombre del tipo de contrato
            const tipoContrato = await EmploymentContractService.obtenerTipoContratoPorId(employee.contrato)
            const nombreTipoContrato = tipoContrato ? tipoContrato.contract_type : 'Tipo de contrato no encontrado'

            // Retornar el empleado con los proyectos (IDs y nombres) y el tipo de contrato
            return {
                ...employee,
                proyecto: projectsWithDetails, // Mantener tanto IDs como nombres
                tipoContrato: nombreTipoContrato // Agregar el nombre del tipo de contrato
            }
        })
    )

    return {
        Data: employeeListWithProjectNames
    }
}