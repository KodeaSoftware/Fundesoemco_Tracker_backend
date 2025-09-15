import { sequelize } from '../database';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

// Definición del modelo Sequelize para EmployeeAttendance
export class EmployeeAttendanceModel extends Model<
    InferAttributes<EmployeeAttendanceModel>,
    InferCreationAttributes<EmployeeAttendanceModel>
> {
    declare id: CreationOptional<string>;
    declare employee_id: string;
    declare project_id: string;
    declare attendance_date: Date;
    declare attendance_time: Date;
    declare status: 'puntual' | 'tarde';
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

EmployeeAttendanceModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'id'
        }
    },
    project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    attendance_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    attendance_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('puntual', 'tarde'),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'EmployeeAttendance',
    tableName: 'employee_attendance',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
