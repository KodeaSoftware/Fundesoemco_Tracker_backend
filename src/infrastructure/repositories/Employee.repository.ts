import { EmployeePort } from '../../domain/ports/EmployeePort';
import { Employee } from '../../domain/models/Employee';
import { EmployeeModel } from "../persistence/models/EmployeeModel"
export class EmployeeRepository implements EmployeePort {


    async verificarPorCedula(cedula: number): Promise<boolean> {
        const count = await EmployeeModel.count({ where: { cedula } });
        return count > 0;
    }

    async traerPorCedula(cedula: number): Promise<Employee | null> {
        const employee = await EmployeeModel.findOne({ where: { cedula } })

        if (!employee) {
            return null;
        }

        return new Employee(
            employee.getDataValue('cedula'),
            employee.getDataValue('nombre'),
            employee.getDataValue('departamento'),
            employee.getDataValue('cargo'),
            employee.getDataValue('contrato'),
            employee.getDataValue('proyecto'),
            employee.getDataValue('telefono'),
            employee.getDataValue('id')
        );
    }

    async crearEmpleado(empleado: Employee): Promise<Employee> {
        try {
            const empleadoCreado = await EmployeeModel.create({
                id: empleado.id,
                cedula: empleado.cedula,
                nombre: empleado.nombre,
                departamento: empleado.departamento,
                cargo: empleado.cargo,
                contrato: empleado.contrato,
                proyecto: empleado.proyecto,
                telefono: empleado.telefono
            });

            return new Employee(
                empleadoCreado.getDataValue('cedula'),
                empleadoCreado.getDataValue('nombre'),
                empleadoCreado.getDataValue('departamento'),
                empleadoCreado.getDataValue('cargo'),
                empleadoCreado.getDataValue('contrato'),
                empleadoCreado.getDataValue('proyecto'),
                empleadoCreado.getDataValue('telefono'),
                empleadoCreado.getDataValue('id'),
            );
        } catch (error) {
            throw new Error("Error al crear empleado: " + error);
        }
    }



    async eliminarEmpleado(id: string): Promise<boolean> {
        const deleted = await EmployeeModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async editarEmpleado(empleado: Employee): Promise<boolean> {
        const [updated] = await EmployeeModel.update({
            cedula: empleado.cedula,
            nombre: empleado.nombre,
            departamento: empleado.departamento,
            cargo: empleado.cargo,
            telefono: empleado.telefono,
            contrato: empleado.contrato,
            proyecto: empleado.proyecto,
        }, {
            where: { id: empleado.id },
        });
        return updated > 0;
    }

    async traerEmpleados(): Promise<Employee[]> {
        const empleados = await EmployeeModel.findAll();
        return empleados.map(e => new Employee(
            e.getDataValue('cedula'),
            e.getDataValue('nombre'),
            e.getDataValue('departamento'),
            e.getDataValue('cargo'),
            e.getDataValue('contrato'),
            e.getDataValue('proyecto'),
            e.getDataValue('telefono'),
            e.getDataValue('id')
        ));
    }
}
