import { ProjectAssignamentEmployeeRepository } from "../repositories/ProjectAssignamentEmployee.repository";
import { ProjectAssignamentEmployeeModel } from "../persistence/models/ProjectAssignamentEmployeeModel";
import { ProjectAssignamentEmployeePort } from "../../domain/ports/ProjectAssignamentEmployeePort";
import { ProjectAssignamentEmployee } from "../../domain/models/ProjectAssignamentEmployee";

export class ProjectAssignamentEmployeeAdapter implements ProjectAssignamentEmployeePort {

    private repository = new ProjectAssignamentEmployeeRepository()

    eliminarEmpleadoDeProyecto(idEmployee: string): Promise<boolean> {
        return this.repository.eliminarEmpleadoDeProyecto(idEmployee)
    }
    listarEmpleadosDeProyecto(idPorject: string): Promise<ProjectAssignamentEmployee[]> {
        return this.repository.listarEmpleadosDeProyecto(idPorject)
    }
    asignarProyecto(idPorject: string, idEmployee: string): Promise<boolean> {
        return this.repository.asignarProyecto(idPorject, idEmployee)
    }
}