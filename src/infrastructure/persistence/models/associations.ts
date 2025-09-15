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

ProjectModel.belongsTo(ProjectAssignamentEmployeeModel, {
    foreignKey: "id",
    as: "project_model"
})

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

// Employee pertenece a un Proyecto
EmployeeModel.belongsTo(ProjectModel, {
    foreignKey: 'proyecto',
    as: 'proyectoData'
});

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


