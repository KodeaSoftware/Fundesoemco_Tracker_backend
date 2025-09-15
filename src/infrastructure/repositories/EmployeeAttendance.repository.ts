import { EmployeeAttendanceModel } from "../persistence/models/EmployeeAttendanceModel";
import { EmployeeAttendance } from "../../domain/models/EmployeeAttendance";
import { Op } from 'sequelize';

export class EmployeeAttendanceRepository {

    async crearAsistencia(asistencia: EmployeeAttendance): Promise<EmployeeAttendance> {
        try {
            const asistenciaCreada = await EmployeeAttendanceModel.create({
                id: asistencia.id,
                employee_id: asistencia.employee_id,
                project_id: asistencia.project_id,
                attendance_date: asistencia.attendance_date,
                attendance_time: asistencia.attendance_time,
                status: asistencia.status
            });

            return new EmployeeAttendance(
                asistenciaCreada.employee_id,
                asistenciaCreada.project_id,
                asistenciaCreada.attendance_date,
                asistenciaCreada.attendance_time,
                asistenciaCreada.status,
                asistenciaCreada.id,
                asistenciaCreada.created_at,
                asistenciaCreada.updated_at
            );
        } catch (error) {
            console.error('Error al crear asistencia:', error);
            throw error;
        }
    }

    async obtenerAsistenciaPorEmpleadoYFecha(employee_id: string, fecha: Date): Promise<EmployeeAttendance | null> {
        try {
            const asistencia = await EmployeeAttendanceModel.findOne({
                where: {
                    employee_id: employee_id,
                    attendance_date: fecha
                }
            });

            if (!asistencia) return null;

            return new EmployeeAttendance(
                asistencia.employee_id,
                asistencia.project_id,
                asistencia.attendance_date,
                asistencia.attendance_time,
                asistencia.status,
                asistencia.id,
                asistencia.created_at,
                asistencia.updated_at
            );
        } catch (error) {
            console.error('Error al obtener asistencia por empleado y fecha:', error);
            throw error;
        }
    }

    async obtenerTodasLasAsistencias(): Promise<EmployeeAttendance[]> {
        try {
            const asistencias = await EmployeeAttendanceModel.findAll({
                order: [['attendance_date', 'DESC'], ['attendance_time', 'DESC']]
            });

            return asistencias.map(asistencia => new EmployeeAttendance(
                asistencia.employee_id,
                asistencia.project_id,
                asistencia.attendance_date,
                asistencia.attendance_time,
                asistencia.status,
                asistencia.id,
                asistencia.created_at,
                asistencia.updated_at
            ));
        } catch (error) {
            console.error('Error al obtener todas las asistencias:', error);
            throw error;
        }
    }

    async obtenerAsistenciasPorFecha(fecha: Date): Promise<EmployeeAttendance[]> {
        try {
            const asistencias = await EmployeeAttendanceModel.findAll({
                where: {
                    attendance_date: fecha
                },
                order: [['attendance_time', 'DESC']]
            });

            return asistencias.map(asistencia => new EmployeeAttendance(
                asistencia.employee_id,
                asistencia.project_id,
                asistencia.attendance_date,
                asistencia.attendance_time,
                asistencia.status,
                asistencia.id,
                asistencia.created_at,
                asistencia.updated_at
            ));
        } catch (error) {
            console.error('Error al obtener asistencias por fecha:', error);
            throw error;
        }
    }

    async actualizarAsistencia(asistencia: EmployeeAttendance): Promise<boolean> {
        try {
            const [rowsAffected] = await EmployeeAttendanceModel.update({
                employee_id: asistencia.employee_id,
                project_id: asistencia.project_id,
                attendance_date: asistencia.attendance_date,
                attendance_time: asistencia.attendance_time,
                status: asistencia.status
            }, {
                where: { id: asistencia.id }
            });

            return rowsAffected > 0;
        } catch (error) {
            console.error('Error al actualizar asistencia:', error);
            throw error;
        }
    }

    async eliminarAsistencia(id: string): Promise<boolean> {
        try {
            const rowsAffected = await EmployeeAttendanceModel.destroy({
                where: { id: id }
            });

            return rowsAffected > 0;
        } catch (error) {
            console.error('Error al eliminar asistencia:', error);
            throw error;
        }
    }
}
