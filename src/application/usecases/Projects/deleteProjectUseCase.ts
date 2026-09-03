import { ProjectService } from "../../services/Project.serviceInstance";
import { ProjectAssignamentService } from "../../services/ProjectAssignament.serviceInstance";
import { ProjectAssignamentCoordinatorService } from "../../services/ProjectAassignamentCoordinator.serviceInstance";
import { EmployeeAttendanceService } from "../../services/EmployeeAttendance.serviceInstance";

export async function deleteProjectUseCase(idProject: string) {
    // 1. Eliminar asistencias asociadas al proyecto
    try {
        await EmployeeAttendanceService.eliminarAsistenciasPorProyecto(idProject);
    } catch (e) {
        console.warn(`Aviso al eliminar asistencias del proyecto ${idProject}:`, e);
    }

    // 2. Desvincular empleados del proyecto
    try {
        await ProjectAssignamentService.vaciarEmpleadosDeProyecto(idProject);
    } catch (e) {
        console.warn(`Aviso al desvincular empleados del proyecto ${idProject}:`, e);
    }

    // 3. Desvincular coordinadores del proyecto
    try {
        await ProjectAssignamentCoordinatorService.vaciarCoordinadoresDeProyecto(idProject);
    } catch (e) {
        console.warn(`Aviso al desvincular coordinadores del proyecto ${idProject}:`, e);
    }

    // 4. Eliminar el proyecto
    const deleted = await ProjectService.eliminarProject(idProject);
    if (!deleted) {
        throw new Error(`No se pudo eliminar el proyecto ${idProject}`);
    }

    return {
        state: "Deleted",
        id: idProject,
        message: "Proyecto y sus asignaciones eliminados correctamente"
    };
}