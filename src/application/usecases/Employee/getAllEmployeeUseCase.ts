import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectService } from "../../services/Project.serviceInstance";

export async function getAllEmployeeUseCase() {

    const employeeList = await EmployeeService.traerEmpleados()

    // Procesar cada empleado para obtener los nombres de los proyectos
    const employeeListWithProjectNames = await Promise.all(
        employeeList.map(async (employee) => {
            // Obtener los nombres de los proyectos para cada empleado
            const projectNames = await Promise.all(
                employee.proyecto.map(async (projectId) => {
                    const project = await ProjectService.traerProjectPorId(projectId)
                    return project ? project.titulo : 'Proyecto no encontrado'
                })
            )

            // Retornar el empleado con los nombres de los proyectos
            return {
                ...employee,
                proyecto: projectNames // Reemplazar los IDs con los nombres
            }
        })
    )

    return {
        Data: employeeListWithProjectNames
    }
}