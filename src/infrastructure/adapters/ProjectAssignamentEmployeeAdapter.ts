import { ProjectAssignamentEmployeeRepository } from "../repositories/ProjectAssignamentEmployee.repository";
import { ProjectAssignamentEmployeeModel } from "../persistence/models/ProjectAssignamentEmployeeModel";
import { ProjectAssignamentEmployeePort } from "../../domain/ports/ProjectAssignamentEmployeePort";
import { ProjectAssignamentEmployee } from "../../domain/models/ProjectAssignamentEmployee";

export class ProjectAssignamentEmployeeAdapter implements ProjectAssignamentEmployeePort {

    private repository = new ProjectAssignamentEmployeeRepository()

    eliminarEmpleadoDeProyecto(idEmployee: string): Promise<boolean> {
        return this.repository.eliminarEmpleadoDeProyecto(idEmployee)
    }
    listarEmpleadosDeProyecto(idProject: string): Promise<ProjectAssignamentEmployee[]> {
        return this.repository.listarEmpleadosDeProyecto(idProject)
    }
    asignarProyecto(ProjectAssignament: ProjectAssignamentEmployee): Promise<boolean> {
        return this.repository.asignarProyecto(ProjectAssignament)
    }
    reasignarEmpleadosDeProyecto(oldProjectId: string, newProjectId: string): Promise<boolean> {
        return this.repository.reasignarEmpleadosDeProyecto(oldProjectId, newProjectId)
    }
    vaciarEmpleadosDeProyecto(idProject: string): Promise<boolean> {
        return this.repository.vaciarEmpleadosDeProyecto(idProject)
    }
}