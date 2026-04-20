import { EmployeeService } from "../../services/Employee.serviceInstance"
import { ProjectAssignamentService } from "../../services/ProjectAssignament.serviceInstance"
import { EmployeeAttendanceService } from "../../services/EmployeeAttendance.serviceInstance"

export async function deleteEmployeeUseCase(id: string) {

    // Primero eliminar las relaciones del empleado con los proyectos
    const eliminarRelaciones = await ProjectAssignamentService.eliminarEmpleadoDeProyecto(id)
    if (!eliminarRelaciones) {
        console.warn(`No se encontraron relaciones de proyectos para el empleado ${id}`)
    }

    // Luego eliminar las asistencias
    const eliminarAsistencias = await EmployeeAttendanceService.eliminarAsistenciasPorEmpleado(id)
    if (!eliminarAsistencias) {
        console.warn(`No se encontraron asistencias para el empleado ${id}`)
    }

    // Luego eliminar el empleado
    const eliminate = await EmployeeService.eliminarEmpleado(id)
    if (!eliminate) throw new Error(`Error al eliminar ${id}`)

    return {
        state: "Deleted",
        id: id,
        message: "Empleado y sus relaciones con proyectos eliminados correctamente"
    }
}

