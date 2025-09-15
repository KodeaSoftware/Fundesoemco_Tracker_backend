import { EmployeeAttendance } from "../../domain/models/EmployeeAttendance";
import { EmployeeAttendancePort } from "../../domain/ports/EmployeeAttendancePort";
import { EmployeeAttendanceRepository } from "../repositories/EmployeeAttendance.repository";

export class EmployeeAttendanceAdapter implements EmployeeAttendancePort {

    // Instancia del repositorio para el adapter
    private repository = new EmployeeAttendanceRepository()

    async crearAsistencia(asistencia: EmployeeAttendance): Promise<EmployeeAttendance> {
        return await this.repository.crearAsistencia(asistencia)
    }

    async obtenerAsistenciaPorEmpleadoYFecha(employee_id: string, fecha: Date): Promise<EmployeeAttendance | null> {
        return await this.repository.obtenerAsistenciaPorEmpleadoYFecha(employee_id, fecha)
    }

    async obtenerTodasLasAsistencias(): Promise<EmployeeAttendance[]> {
        return await this.repository.obtenerTodasLasAsistencias()
    }

    async obtenerAsistenciasPorFecha(fecha: Date): Promise<EmployeeAttendance[]> {
        return await this.repository.obtenerAsistenciasPorFecha(fecha)
    }

    async actualizarAsistencia(asistencia: EmployeeAttendance): Promise<boolean> {
        return await this.repository.actualizarAsistencia(asistencia)
    }

    async eliminarAsistencia(id: string): Promise<boolean> {
        return await this.repository.eliminarAsistencia(id)
    }
}
