import { EmployeeAttendance } from "../models/EmployeeAttendance";

export interface EmployeeAttendancePort {
    crearAsistencia(asistencia: EmployeeAttendance): Promise<EmployeeAttendance>;
    obtenerAsistenciaPorEmpleadoYFecha(employee_id: string, fecha: Date): Promise<EmployeeAttendance | null>;
    obtenerTodasLasAsistencias(): Promise<EmployeeAttendance[]>;
    obtenerAsistenciasPorFecha(fecha: Date): Promise<EmployeeAttendance[]>;
    actualizarAsistencia(asistencia: EmployeeAttendance): Promise<boolean>;
    eliminarAsistencia(id: string): Promise<boolean>;
}
