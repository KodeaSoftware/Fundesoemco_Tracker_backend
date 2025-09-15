import { ProjectService } from "../../services/Project.serviceInstance";
import { EmployeeService } from "../../services/Employee.serviceInstance";
import { EmployeeAttendanceService } from "../../services/EmployeeAttendance.serviceInstance";
import { EmployeeAttendance } from "../../../domain/models/EmployeeAttendance";

export async function attendanceEmployeeUseCase(cedula: number, idProject: string) {

    const employee = await EmployeeService.traerPorCedula(cedula)
    const project = await ProjectService.traerProjectPorId(idProject)

    if (!employee || !project) {
        throw new Error("Empleado o proyecto no encontrado")
    }

    // Verificar si ya existe una asistencia para hoy
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Inicio del día

    const existingAttendance = await EmployeeAttendanceService.obtenerAsistenciaPorEmpleadoYFecha(
        employee.id!,
        today
    )

    if (existingAttendance) {
        throw new Error("El empleado ya registró asistencia hoy")
    }

    // Comparar solo la hora (ignorando fecha/mes) construyendo horas "de hoy"
    const now = new Date()
    let status: 'puntual' | 'tarde' = 'tarde' // Por defecto tarde

    if (project?.jornada) {
        const entradaHoy = new Date(now)
        entradaHoy.setHours(
            project.jornada.horaEntrada.getHours(),
            project.jornada.horaEntrada.getMinutes(),
            project.jornada.horaEntrada.getSeconds(),
            0
        )

        if (now <= entradaHoy) {
            status = 'puntual'
        }
    }

    // Crear el registro de asistencia
    // Convertir la fecha completa a solo la hora para el campo attendance_time
    const timeOnly = new Date();
    timeOnly.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0);

    const attendance = new EmployeeAttendance(
        employee.id!,
        idProject,
        today,
        timeOnly,
        status
    )

    const attendanceCreated = await EmployeeAttendanceService.crearAsistencia(attendance)

    return {
        state: "Attendance",
        id: employee.id,
        attendance_id: attendanceCreated.id,
        status: attendanceCreated.status,
        time: attendanceCreated.attendance_time
    }
}