import { EmployeeAttendanceService } from "../../services/EmployeeAttendance.serviceInstance";
import { EmployeeService } from "../../services/Employee.serviceInstance";

export interface EmployeeAttendanceInfo {
    cedula: number;
    estado: string; // "puntual" o "tarde"
    fecha_asistencia: Date;
    hora_asistencia: Date;
    empleado: {
        id: string;
        cedula: number;
        nombre: string;
        departamento: string;
        cargo: string;
        contrato: number;
        proyecto: string[];
        telefono: number;
        tipoContrato?: string;
        nombreProject?: string[];
    };
}

export async function getAllEmployeeAttendanceUseCase(): Promise<EmployeeAttendanceInfo[]> {
    try {
        // Obtener todas las asistencias de la base de datos
        const asistencias = await EmployeeAttendanceService.obtenerTodasLasAsistencias();

        // Obtener información de empleados para cada asistencia
        const resultado: EmployeeAttendanceInfo[] = [];

        for (const asistencia of asistencias) {
            try {
                // Buscar empleado por ID (necesitamos obtener la cédula)
                const empleados = await EmployeeService.traerEmpleados();
                const empleado = empleados.find(emp => emp.id === asistencia.employee_id);

                if (empleado) {
                    resultado.push({
                        cedula: empleado.cedula,
                        estado: asistencia.status,
                        fecha_asistencia: asistencia.attendance_date,
                        hora_asistencia: asistencia.attendance_time,
                        empleado: {
                            id: empleado.id || "",
                            cedula: empleado.cedula,
                            nombre: empleado.nombre,
                            departamento: empleado.departamento,
                            cargo: empleado.cargo,
                            contrato: empleado.contrato,
                            proyecto: empleado.proyecto,
                            telefono: empleado.telefono,
                            tipoContrato: empleado.tipoContrato,
                            nombreProject: empleado.nombreProject
                        }
                    });
                }
            } catch (error) {
                console.error(`Error al obtener empleado ${asistencia.employee_id}:`, error);
                // Continuar con el siguiente empleado
            }
        }

        return resultado;

    } catch (error) {
        console.error('Error en getAllEmployeeAttendanceUseCase:', error);
        throw new Error('Error al obtener información de asistencia de empleados');
    }
}
