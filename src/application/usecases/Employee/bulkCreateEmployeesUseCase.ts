import * as XLSX from 'xlsx';
import { Employee } from "../../../domain/models/Employee";
import { ProjectAssignamentEmployee } from "../../../domain/models/ProjectAssignamentEmployee";
import { EmployeeService } from "../../services/Employee.serviceInstance";
import { ProjectAssignamentService } from "../../services/ProjectAssignament.serviceInstance";

export async function bulkCreateEmployeesUseCase(fileBuffer: Buffer) {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data: any[] = XLSX.utils.sheet_to_json(sheet);

    const results = {
        created: 0,
        errors: [] as string[]
    };

    for (const row of data) {
        try {
            const nombre = row['Nombre Completo'];
            const cedula = row['Cedula']?.toString();
            const telefono = row['Telefono']?.toString();
            const departamento = row['Departamento'];
            const cargo = row['Cargo'];
            const idProject = row['UUID Proyecto (Ver Hoja Referencias)'];
            const idTipoContrato = parseInt(row['ID Contrato (Ver Hoja Referencias)']);

            if (!nombre || !cedula) continue;

            const newEmployee = new Employee(
                cedula,
                nombre,
                departamento,
                cargo,
                idTipoContrato,
                idProject,
                telefono
            );

            await EmployeeService.crearEmpleado(newEmployee);
            
            if (idProject) {
                const assignment = new ProjectAssignamentEmployee(idProject, newEmployee.id);
                await ProjectAssignamentService.asignarProyecto(assignment);
            }

            results.created++;
        } catch (error: any) {
            results.errors.push(`Error en fila ${results.created + results.errors.length + 2}: ${error.message}`);
        }
    }

    return results;
}
