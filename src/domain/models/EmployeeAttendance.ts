import { v4 as uuidv4 } from 'uuid';

export interface EmployeeAttendanceData {
    employee_id: string;
    project_id: string;
    attendance_date: Date;
    attendance_time: Date;
    status: 'puntual' | 'tarde';
    id?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class EmployeeAttendance {
    public employee_id: string;
    public project_id: string;
    public attendance_date: Date;
    public attendance_time: Date;
    public status: 'puntual' | 'tarde';
    public id: string;
    public created_at?: Date;
    public updated_at?: Date;

    constructor(
        employee_id: string,
        project_id: string,
        attendance_date: Date,
        attendance_time: Date,
        status: 'puntual' | 'tarde',
        id?: string,
        created_at?: Date,
        updated_at?: Date
    ) {
        this.employee_id = employee_id;
        this.project_id = project_id;
        this.attendance_date = attendance_date;
        this.attendance_time = attendance_time;
        this.status = status;
        this.id = id ?? uuidv4();
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    validarDatos(): void {
        if (!this.employee_id) throw new Error("Falta employee_id");
        if (!this.project_id) throw new Error("Falta project_id");
        if (!this.status || !['puntual', 'tarde'].includes(this.status)) {
            throw new Error("Status debe ser 'puntual' o 'tarde'");
        }
    }
}
