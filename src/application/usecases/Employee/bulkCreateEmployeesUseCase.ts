import * as XLSX from 'xlsx';
import { Employee } from "../../../domain/models/Employee";
import { ProjectAssignamentEmployee } from "../../../domain/models/ProjectAssignamentEmployee";
import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectAssignamentService } from "../../services/ProjectAssignament.serviceInstance";

export async function bulkCreateEmployeesUseCase(fileBuffer: Buffer) {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    // Buscar la hoja de empleados por nombre o tomar la primera hoja disponible
    const sheetName = workbook.SheetNames.find(s => s.toLowerCase().includes('empleado')) || workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data: any[] = XLSX.utils.sheet_to_json(sheet);

    const results = {
        created: 0,
        skipped: 0,
        errors: [] as string[]
    };

    const seenCedulasInBatch = new Set<number>();

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowNumber = i + 2; // +1 por base 0, +1 por fila de encabezados en Excel

        try {
            const nombre = (row['Nombre Completo'] ?? row['nombre'] ?? row['Nombre'])?.toString()?.trim();
            const rawCedula = row['Cedula'] ?? row['cedula'] ?? row['Cédula'] ?? row['CEDULA'];

            // Ignorar filas completamente vacías
            if (!nombre && !rawCedula) {
                continue;
            }

            if (!nombre) {
                results.errors.push(`Fila ${rowNumber}: Falta el nombre completo`);
                continue;
            }

            if (!rawCedula) {
                results.errors.push(`Fila ${rowNumber} (${nombre}): Falta la cédula`);
                continue;
            }

            const cleanCedula = rawCedula.toString().replace(/\D/g, '');
            const cedula = parseInt(cleanCedula, 10);

            if (!cedula || isNaN(cedula)) {
                results.errors.push(`Fila ${rowNumber} (${nombre}): Cédula inválida '${rawCedula}'`);
                continue;
            }

            // Si ya se procesó en este mismo archivo, omitir para evitar duplicidad interna
            if (seenCedulasInBatch.has(cedula)) {
                results.skipped++;
                continue;
            }
            seenCedulasInBatch.add(cedula);

            // Verificar si el empleado ya existe en la base de datos (no reemplazar, solo omitir)
            const yaExiste = await EmployeeService.verificarPorCedula(cedula);
            if (yaExiste) {
                results.skipped++;
                continue;
            }

            const rawTel = row['Telefono'] ?? row['telefono'] ?? row['Teléfono'] ?? row['TELEFONO'];
            const cleanTel = rawTel ? rawTel.toString().replace(/\D/g, '') : '';
            const telefono = cleanTel ? parseInt(cleanTel, 10) : 0;

            const departamento = (row['Departamento'] ?? row['departamento'] ?? 'General').toString().trim();
            const cargo = (row['Cargo'] ?? row['cargo'] ?? 'Operario').toString().trim();

            const rawContrato = row['ID Contrato (Ver Hoja Referencias)'] ?? row['ID Contrato'] ?? row['contrato'] ?? row['Contrato'];
            const idTipoContrato = rawContrato ? parseInt(rawContrato.toString().replace(/\D/g, ''), 10) : 1;

            const rawProject = row['UUID Proyecto (Ver Hoja Referencias)'] ?? row['UUID Proyecto'] ?? row['proyecto'] ?? row['Proyecto'];
            let projectIds: string[] = [];
            if (rawProject) {
                if (Array.isArray(rawProject)) {
                    projectIds = rawProject.map((p: any) => p.toString().trim()).filter(Boolean);
                } else {
                    projectIds = rawProject.toString().split(/[,;]+/).map((p: string) => p.trim()).filter(Boolean);
                }
            }

            const newEmployee = new Employee(
                cedula,
                nombre,
                departamento,
                cargo,
                idTipoContrato,
                projectIds, // Debe ser string[] para que Sequelize lo guarde como ARRAY(UUID)
                telefono
            );

            const empleadoCreado = await EmployeeService.crearEmpleado(newEmployee);

            if (projectIds.length > 0 && empleadoCreado.id) {
                for (const pId of projectIds) {
                    try {
                        const assignment = new ProjectAssignamentEmployee(pId, empleadoCreado.id);
                        await ProjectAssignamentService.asignarProyecto(assignment);
                    } catch (assignError: any) {
                        console.error(`Error al asignar proyecto ${pId} a empleado ${cedula}:`, assignError?.message || assignError);
                    }
                }
            }

            results.created++;
        } catch (error: any) {
            results.errors.push(`Fila ${rowNumber}: ${error.message || error}`);
        }
    }

    return results;
}
