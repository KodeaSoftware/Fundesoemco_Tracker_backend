import { ProjectAssignamentEmployee } from "../../domain/models/ProjectAssignamentEmployee";
import { ProjectAssignamentEmployeeModel } from "../persistence/models/ProjectAssignamentEmployeeModel";
import { ProjectAssignamentEmployeePort } from "../../domain/ports/ProjectAssignamentEmployeePort";

export class ProjectAssignamentEmployeeRepository implements ProjectAssignamentEmployeePort {

    async asignarProyecto(ProjectAssignament: ProjectAssignamentEmployee): Promise<boolean> {
        const { id, ...ProjectAssignamentData } = ProjectAssignament
        try {
            await ProjectAssignamentEmployeeModel.create(ProjectAssignamentData);
            return true;
        } catch (error) {
            throw new Error("Error al asignar proyecto: " + error);
        }
    }

    async eliminarEmpleadoDeProyecto(idEmployee: string): Promise<boolean> {
        const deleted = await ProjectAssignamentEmployeeModel.destroy({ where: { idEmployee } })
        return deleted > 0
    }

    async listarEmpleadosDeProyecto(idProject: string): Promise<ProjectAssignamentEmployee[]> {
        const asignaciones = await ProjectAssignamentEmployeeModel.findAll({
            where: { idProject }
        });
        return asignaciones.map(a => new ProjectAssignamentEmployee(
            a.getDataValue('idProject'),
            a.getDataValue('idEmployee'),
        ));
    }

    async reasignarEmpleadosDeProyecto(oldProjectId: string, newProjectId: string): Promise<boolean> {
        const [updated] = await ProjectAssignamentEmployeeModel.update(
            { idProject: newProjectId },
            { where: { idProject: oldProjectId } }
        );
        return updated >= 0; // successfully executed
    }

    async vaciarEmpleadosDeProyecto(idProject: string): Promise<boolean> {
        const deleted = await ProjectAssignamentEmployeeModel.destroy({ where: { idProject } });
        return deleted >= 0;
    }

}