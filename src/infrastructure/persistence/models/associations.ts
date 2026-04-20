import { EmployeeModel } from './EmployeeModel';
import { EmploymentContractModel } from './EmploymentContractModel';
import { ProjectAssignamentEmployeeModel } from './ProjectAssignamentEmployeeModel';
import { ProjectModel } from './ProjectModel';
import { EmployeeAttendanceModel } from './EmployeeAttendanceModel';

// ProjectAssignamentEmployeeModel pertenece a un Proyecto
ProjectAssignamentEmployeeModel.belongsTo(ProjectModel, {
    foreignKey: 'idProject',
    as: 'proyecto'
});

// ProjectAssignamentEmployeeModel pertenece a un Empleado
ProjectAssignamentEmployeeModel.belongsTo(EmployeeModel, {
    foreignKey: 'idEmployee',
    as: 'empleado'
});

// Employee tiene muchas asignaciones
EmployeeModel.hasMany(ProjectAssignamentEmployeeModel, {
    foreignKey: 'idEmployee',
    as: 'asignacionesProyecto'
});

// Employee tiene un tipo de contrato
EmployeeModel.belongsTo(EmploymentContractModel, {
    foreignKey: 'contrato',
    as: 'tipoContrato'
});

// Nota: EmployeeModel.proyecto es un array de UUIDs (uuid[]) y no puede usarse
// como FK directa. Las asignaciones de proyectos se manejan mediante la tabla
// project_employee (ProjectAssignamentEmployeeModel).

// EmployeeAttendance pertenece a un Employee
EmployeeAttendanceModel.belongsTo(EmployeeModel, {
    foreignKey: 'employee_id',
    as: 'empleado'
});

// EmployeeAttendance pertenece a un Project
EmployeeAttendanceModel.belongsTo(ProjectModel, {
    foreignKey: 'project_id',
    as: 'proyecto'
});

// Employee tiene muchas asistencias
EmployeeModel.hasMany(EmployeeAttendanceModel, {
    foreignKey: 'employee_id',
    as: 'asistencias'
});

// Project tiene muchas asistencias
ProjectModel.hasMany(EmployeeAttendanceModel, {
    foreignKey: 'project_id',
    as: 'asistencias'
});


