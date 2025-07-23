import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';
import { EmploymentContractModel } from './EmploymentContractModel';
import { ProjectAssignamentEmployeeModel } from './ProjectAssignamentEmployeeModel';

// Definición del modelo Sequelize para Employee
export class EmployeeModel extends Model { }

EmployeeModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    cedula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrato: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    proyecto: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: false,
});
