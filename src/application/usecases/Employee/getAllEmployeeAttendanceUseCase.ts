import { EmployeeAttendanceService } from "../../services/EmployeeAttendance.serviceInstance";
import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectService } from "../../services/Project.serviceInstance";

export interface EmployeeAttendanceInfo {
    id?: string;
    employee_id: string;
    project_id: string;
    project_title?: string;
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
        
        // Obtener todos los empleados una sola vez
        const empleados = await EmployeeService.traerEmpleados();
        const empleadosMap = new Map(empleados.map(emp => [emp.id, emp]));

        // Obtener todos los proyectos una sola vez para mapear títulos
        const proyectos = await ProjectService.traerProject();
        const proyectosMap = new Map(proyectos.map(p => [p.id, p]));

        for (const asistencia of asistencias) {
            try {
                // Buscar empleado en el mapa por ID
                const empleado = empleadosMap.get(asistencia.employee_id);
                const proyecto = proyectosMap.get(asistencia.project_id);

                if (empleado) {
                    resultado.push({
                        id: asistencia.id,
                        employee_id: asistencia.employee_id,
                        project_id: asistencia.project_id,
                        project_title: proyecto ? proyecto.titulo : 'Proyecto no encontrado',
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
                console.error(`Error al procesar asistencia de empleado ${asistencia.employee_id}:`, error);
            }
        }

        return resultado;

    } catch (error) {
        console.error('Error en getAllEmployeeAttendanceUseCase:', error);
        throw new Error('Error al obtener información de asistencia de empleados');
    }
}
