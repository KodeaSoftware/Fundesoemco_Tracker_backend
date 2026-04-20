import { ProjectService } from "../../services/Project.serviceInstance";
import { EmployeeService } from "../../services/Employee.serviceInstance";
import { EmployeeAttendanceService } from "../../services/EmployeeAttendance.serviceInstance";
import { EmployeeAttendance } from "../../../domain/models/EmployeeAttendance";
import { RecursosHumanosService } from "../../services/RecursosHumanos.serviceInstance";
import { EmailService } from "../../services/Email.serviceInstance";

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

    const now = new Date()
    let status: 'puntual' | 'tarde' = 'puntual' // Por defecto puntual

    if (project?.jornada?.horaEntrada) {
        const entradaHoy = new Date(now)
        entradaHoy.setHours(
            project.jornada.horaEntrada.getHours(),
            project.jornada.horaEntrada.getMinutes(),
            project.jornada.horaEntrada.getSeconds(),
            0
        )
        if (now > entradaHoy) {
            status = 'tarde'
        }
    }

    // Crear el registro de asistencia
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

    // Si llegó tarde, notificar a RRHH por correo
    if (status === 'tarde') {
        try {
            const rrhhList = await RecursosHumanosService.traerRecursosHumanos();
            const emails = rrhhList.map(r => r.correo);
            
            if (emails.length > 0) {
                const subject = `⚠️ ALERTA: Llegada Tarde - ${employee.nombre}`;
                const html = `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #e67e22;">Alerta de Asistencia Tardía</h2>
                        <p>El siguiente colaborador ha registrado su ingreso después de la hora permitida:</p>
                        <ul>
                            <li><strong>Empleado:</strong> ${employee.nombre}</li>
                            <li><strong>Cédula:</strong> ${employee.cedula}</li>
                            <li><strong>Proyecto:</strong> ${project.titulo}</li>
                            <li><strong>Hora de Registro:</strong> ${now.toLocaleTimeString()}</li>
                            <li><strong>Hora Programada:</strong> ${project.jornada?.horaEntrada?.toLocaleTimeString() || 'N/A'}</li>
                        </ul>
                        <p style="color: #666; font-size: 12px;">Fundesoemco Tracker - Sistema Automático de Alertas</p>
                    </div>
                `;
                
                // Enviamos al primer RRHH por simplicidad de la API de Resend en modo trial, 
                // o iteramos si se permite. Resend permite un array 'to'
                await EmailService.enviarEmail(emails[0], subject, html);
            }
        } catch (emailError) {
            console.error("Error al enviar alerta de tardanza:", emailError);
        }
    }

    return {
        state: "Attendance",
        id: employee.id,
        attendance_id: attendanceCreated.id,
        status: attendanceCreated.status,
        time: attendanceCreated.attendance_time
    }
}