import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

// Definición del modelo Sequelize para ProjectAssignamentEmployee
export class ProjectAssignamentCoordinatorModel extends Model { }

ProjectAssignamentCoordinatorModel.init({
    idProject: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    idCoordinator: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
}, {
    sequelize,
    modelName: 'ProjectCoordinator',
    tableName: 'project_coordinator',
    freezeTableName: true,
    timestamps: false,
}); 