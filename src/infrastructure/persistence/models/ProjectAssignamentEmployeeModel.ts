import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

// Definición del modelo Sequelize para ProjectAssignamentEmployee
export class ProjectAssignamentEmployeeModel extends Model { }

ProjectAssignamentEmployeeModel.init({
    idPorject: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    idEmployee: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
}, {
    sequelize,
    modelName: 'ProjectEmployee',
    tableName: 'Project-employee',
    timestamps: false,
}); 