import cron from 'node-cron';
import { EmployeeService } from '../../application/services/Employee.serviceInstance';
import { EmployeeAttendanceService } from '../../application/services/EmployeeAttendance.serviceInstance';
import { RecursosHumanosService } from '../../application/services/RecursosHumanos.serviceInstance';
import { EmailService } from '../../application/services/Email.serviceInstance';

/**
 * Función que genera y envía el reporte diario de inasistencias.
 * Se ejecuta automáticamente mediante cron.
 */
export async function sendDailyAttendanceReport() {
    console.log('--- Iniciando generación de reporte diario de inasistencias ---');
    
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 1. Obtener todos los empleados activos
        const allEmployees = await EmployeeService.traerEmpleados();
        
        // 2. Obtener todas las asistencias de hoy
        const todayAttendances = await EmployeeAttendanceService.obtenerAsistenciasPorFecha(today);
        const presentEmployeeIds = new Set(todayAttendances.map(a => a.employee_id));

        // 3. Identificar inasistencias
        const absentEmployees = allEmployees.filter((emp: any) => !presentEmployeeIds.has(emp.id!));

        if (absentEmployees.length === 0) {
            console.log('No hubo inasistencias hoy. No se enviará reporte.');
            return;
        }

        // 4. Obtener destinatarios (RRHH)
        const rrhhList = await RecursosHumanosService.traerRecursosHumanos();
        const rrhhEmail = rrhhList.length > 0 ? rrhhList[0].correo : null;

        if (!rrhhEmail) {
            console.warn('No se encontró correo de RRHH para enviar el reporte diario');
            return;
        }

        // 5. Construir HTML del reporte
        const absentListHtml = absentEmployees
            .map((emp: any) => `<li><strong>${emp.nombre}</strong> (Cédula: ${emp.cedula}) - Depto: ${emp.departamento}</li>`)
            .join('');

        const subject = `📊 Reporte Diario: Inasistencias - ${today.toLocaleDateString()}`;
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #00BF40; padding-bottom: 10px;">Resumen de Inasistencias Diario</h2>
                <p>Al cierre del día de hoy, <strong>${today.toLocaleDateString()}</strong>, los siguientes trabajadores no registraron su asistencia:</p>
                <ul style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; list-style-type: none;">
                    ${absentListHtml}
                </ul>
                <p style="margin-top: 20px;">Total inasistencias: <strong>${absentEmployees.length}</strong></p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #7f8c8d; font-size: 12px; text-align: center;">Fundesoemco Tracker - Reporte Automático</p>
            </div>
        `;

        await EmailService.enviarEmail(rrhhEmail, subject, html);
        console.log(`Reporte diario enviado exitosamente a ${rrhhEmail}`);

    } catch (error) {
        console.error('Error al generar el reporte diario de asistencia:', error);
    }
}

/**
 * Inicializa el scheduler de tareas automáticas.
 */
export function initScheduler() {
    // Programar para ejecutarse todos los días a las 18:00 (6:00 PM)
    // Formato cron: min hour dayMonth month dayWeek
    cron.schedule('0 18 * * *', () => {
        sendDailyAttendanceReport();
    });

    console.log('⏰ Scheduler de reportes diarios inicializado (18:00h)');
}
