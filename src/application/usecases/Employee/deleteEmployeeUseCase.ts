import { EmployeeService } from "../../services/Employee.serviceInstance"
import { ProjectAssignamentService } from "../../services/ProjectAssignament.serviceInstance"
import { EmployeeAttendanceService } from "../../services/EmployeeAttendance.serviceInstance"

export async function deleteEmployeeUseCase(id: string) {
    // 1. Eliminar las relaciones del empleado con los proyectos
    try {
        await ProjectAssignamentService.eliminarEmpleadoDeProyecto(id);
    } catch (e) {
        console.warn(`Aviso al eliminar asignaciones de proyecto del empleado ${id}:`, e);
    }

    // 2. Eliminar las asistencias del empleado
    try {
        await EmployeeAttendanceService.eliminarAsistenciasPorEmpleado(id);
    } catch (e) {
        console.warn(`Aviso al eliminar asistencias del empleado ${id}:`, e);
    }

    // 3. Eliminar el empleado
    const eliminate = await EmployeeService.eliminarEmpleado(id);
    if (!eliminate) {
        throw new Error(`No se encontró o no se pudo eliminar el empleado con ID: ${id}`);
    }

    return {
        state: "Deleted",
        id: id,
        message: "Empleado y sus relaciones eliminados correctamente"
    };
}
