import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectAssignamentService } from "../../services/ProjectAssignament.serviceInstance";
import { ProjectService } from "../../services/Project.serviceInstance";

import { Employee } from "../../../domain/models/Employee";
import { ProjectAssignamentEmployee } from "../../../domain/models/ProjectAssignamentEmployee";


export async function createEmployeeUseCase(employee: Employee) {

    const isCreated = await EmployeeService.verificarPorCedula(employee.cedula)
    if (isCreated) throw new Error(`Ya existe un empleado con la cédula ${employee.cedula}`)

    const employeeCreated = await EmployeeService.crearEmpleado(employee)
    if (!employeeCreated) throw new Error("Error al crear el empleado")

    const idEmployee = employeeCreated.id

    const projectAssignmanet = await Promise.all(
        employee.proyecto.map(async idProject => {
            const ProjectAssignamentData = new ProjectAssignamentEmployee(idProject, idEmployee)
            return await ProjectAssignamentService.asignarProyecto(ProjectAssignamentData);
        })
    );


    return {
        projectAssignament: projectAssignmanet,
        status: "Created",
        id: employee.id,
        cc: employee.cedula,
        name: employee.nombre,
        employeeObject: employeeCreated
    }
}