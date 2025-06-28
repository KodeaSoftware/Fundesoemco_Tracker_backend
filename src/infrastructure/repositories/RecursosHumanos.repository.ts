import { RecursosHumanos } from "../../domain/models/RecursosHumanos";
import { RecursosHumanosModel } from "../persistence/models/RecursosHumanosModel";
import { RecursosHumanosPort } from "../../domain/ports/RecursosHumanos";

export class RecursosHumanosRepository implements RecursosHumanosPort {

    async verificarPorCedula(cedula: number): Promise<boolean> {
        const count = await RecursosHumanosModel.count({ where: { cedula } });
        return count > 0;
    }

    async crearRecursosHumanos(recursosHumanos: RecursosHumanos): Promise<boolean> {
        try {
            const { id, ...recursosHumanosData } = recursosHumanos
            await RecursosHumanosModel.create(recursosHumanosData);
            return true;
        } catch (error) {
            return false;
        }
    }

    async eliminarRecursosHumanos(id: string): Promise<boolean> {
        const deleted = await RecursosHumanosModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async editarRecursosHumanos(recursosHumanos: RecursosHumanos): Promise<boolean> {
        const [updated] = await RecursosHumanosModel.update({
            cedula: recursosHumanos.cedula,
            nombre: recursosHumanos.nombre,
            departamento: recursosHumanos.departamento,
            cargo: recursosHumanos.cargo,
            contrato: recursosHumanos.contrato,
            proyecto: recursosHumanos.proyecto,
            correo: recursosHumanos.correo,
            password: recursosHumanos.password
        }, {
            where: { id: recursosHumanos.id },
        });
        return updated > 0;
    }

    async traerRecursosHumanos(): Promise<RecursosHumanos[]> {
        const recursosHumanos = await RecursosHumanosModel.findAll();
        return recursosHumanos.map(e => new RecursosHumanos(
            e.getDataValue('cedula'),
            e.getDataValue('nombre'),
            e.getDataValue('departamento'),
            e.getDataValue('cargo'),
            e.getDataValue('contrato'),
            e.getDataValue('proyecto'),
            e.getDataValue('id'),
            e.getDataValue('correo'),
            e.getDataValue('password')
        ));
    }
} 