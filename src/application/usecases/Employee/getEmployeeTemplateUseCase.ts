import * as XLSX from 'xlsx';
import { ProjectService } from "../../services/Project.serviceInstance";
import { EmploymentContractService } from "../../services/EmploymentContract.serviceInstance";

export async function getEmployeeTemplateUseCase() {
    const projects = await ProjectService.traerProject();
    const contractTypes = await EmploymentContractService.listarTiposContrato();

    const wb = XLSX.utils.book_new();

    // Sheet 1: Instrucciones
    const instructionsData = [
        ['GUÍA DE USO DE LA PLANTILLA'],
        [''],
        ['1. No cambie el nombre de las columnas en la hoja "Carga de Empleados".'],
        ['2. Todas las columnas son obligatorias para evitar errores en la carga.'],
        ['3. Para las columnas "UUID Proyecto" e "ID Contrato", use los códigos de la hoja "Referencias".'],
        ['4. Simplemente copie el código (UUID o ID) y péguelo en la columna correspondiente.'],
        [''],
        ['---'],
        ['Hoja Generada el:', new Date().toLocaleString()]
    ];
    const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
    XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instrucciones');

    // Sheet 2: Template
    const templateData = [
        ['Nombre Completo', 'Cedula', 'Telefono', 'Departamento', 'Cargo', 'UUID Proyecto (Ver Hoja Referencias)', 'ID Contrato (Ver Hoja Referencias)'],
        ['Ejemplo Juan Perez', '12345678', '3001234567', 'Logistica', 'Auxiliar', '', '']
    ];
    const wsTemplate = XLSX.utils.aoa_to_sheet(templateData);
    XLSX.utils.book_append_sheet(wb, wsTemplate, 'Carga de Empleados');

    // Sheet 3: Reference Data
    const refData = [
        ['--- CATÁLOGOS DE REFERENCIA ---'],
        [''],
        ['PROYECTOS ACTIVOS'],
        ['UUID_PARA_COPIAR (ID)', 'NOMBRE_DEL_PROYECTO']
    ];
    
    projects.forEach((p: any) => {
        if (p.estado !== 'archivado') {
            refData.push([p.id || '', p.titulo]);
        }
    });

    refData.push(['']);
    refData.push(['TIPOS DE CONTRATO']);
    refData.push(['ID_PARA_COPIAR', 'TIPO_DE_CONTRATO']);
    
    contractTypes.forEach((c: any) => {
        refData.push([c.id?.toString() || '', c.contract_type]);
    });

    const wsRef = XLSX.utils.aoa_to_sheet(refData);
    XLSX.utils.book_append_sheet(wb, wsRef, 'Referencias');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    return buffer;
}
