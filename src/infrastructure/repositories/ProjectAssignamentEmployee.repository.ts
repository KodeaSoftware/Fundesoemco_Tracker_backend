import { ProjectAssignamentEmployee } from "../../domain/models/ProjectAssignamentEmployee";
import { ProjectAssignamentEmployeeModel } from "../persistence/models/ProjectAssignamentEmployeeModel";
import { ProjectAssignamentEmployeePort } from "../../domain/ports/ProjectAssignamentEmployeePort";

export class ProjectAssignamentEmployeeRepository implements ProjectAssignamentEmployeePort {

    async asignarProyecto(ProjectAssignament: ProjectAssignamentEmployee): Promise<boolean> {
        const { ...ProjectAssignamentData } = ProjectAssignament
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

    async listarEmpleadosDeProyecto(idPorject: string): Promise<ProjectAssignamentEmployee[]> {
        const asignaciones = await ProjectAssignamentEmployeeModel.findAll({
            where: { idPorject }
        });
        return asignaciones.map(a => new ProjectAssignamentEmployee(
            a.getDataValue('idPorject'),
            a.getDataValue('idEmployee'),
        ));
    }

}