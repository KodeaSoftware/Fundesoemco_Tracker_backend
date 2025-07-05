import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

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
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contrato: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    proyecto: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: false,
});