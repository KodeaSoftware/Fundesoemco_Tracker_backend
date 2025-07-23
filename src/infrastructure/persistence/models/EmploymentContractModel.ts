import { sequelize } from '../database';
import { DataTypes, Model } from 'sequelize';

export class EmploymentContractModel extends Model { }

EmploymentContractModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    contract_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'EmploymentContract',
    tableName: 'employment_contracts',
    freezeTableName: true,
    timestamps: false,
});
