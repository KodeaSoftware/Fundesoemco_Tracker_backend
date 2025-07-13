import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

// Definición del modelo Sequelize para Project
export class ProjectModel extends Model { }

ProjectModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    creadoEn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    jornada: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
    },
    coordinadores: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        defaultValue: [],
    },
    empleadosDirectos: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        defaultValue: [],
    },
    contratistas: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        defaultValue: [],
    }
}, {
    sequelize,
    modelName: 'Project',
    tableName: 'Project',
    timestamps: false,
}); 