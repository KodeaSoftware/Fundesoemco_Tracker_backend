import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectAssignamentService } from "../../services/ProjectAssignament.serviceInstance";
import { ProjectService } from "../../services/Project.serviceInstance";

import { Employee } from "../../../domain/models/Employee";


export async function createEmployeeUseCase(employee: Employee) {

    const isCreated = await EmployeeService.verificarPorCedula(employee.cedula)
    if (isCreated) throw new Error(`Ya existe un empleado con la cédula ${employee.cedula}`)

    const employeeCreated = await EmployeeService.crearEmpleado(employee)
    if (!employeeCreated) throw new Error("Error al crear el empleado")

    const idProject = await ProjectService.verificarPorTitulo(employee.proyecto[0])

    const idEmployee = employee.id
    ProjectAssignamentService.asignarProyecto(idProject, idEmployee)


    return {
        status: "Created",
        id: employee.id,
        cc: employee.cedula,
        name: employee.nombre
    }
}