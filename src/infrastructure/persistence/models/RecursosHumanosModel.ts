import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

// Definición del modelo Sequelize para RecursosHumanos
export class RecursosHumanosModel extends Model { }

RecursosHumanosModel.init({
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
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RecursosHumanos',
    tableName: 'recursos_humanos',
    timestamps: false,
}); 