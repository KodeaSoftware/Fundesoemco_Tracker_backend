import { Coordinator } from "../../domain/models/Coordinator";
import { CoordinatorModel } from "../persistence/models/CoordinatorModels";
import { CoordinatorPort } from "../../domain/ports/CoordinatorPort";

export class CoordinatorRepository implements CoordinatorPort {

    async verificarPorCedula(cedula: number): Promise<boolean> {
        const count = await CoordinatorModel.count({ where: { cedula } });
        return count > 0;
    }

    async crearCoordinator(coordinator: Coordinator): Promise<boolean> {
        try {
            const { id, ...coordinatorData } = coordinator;
            await CoordinatorModel.create(coordinatorData);
            return true;
        } catch (error) {
            return false;
        }
    }

    async eliminarCoordinator(id: string): Promise<boolean> {
        const deleted = await CoordinatorModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async editarCoordinator(coordinator: Coordinator): Promise<boolean> {
        const [updated] = await CoordinatorModel.update({
            cedula: coordinator.cedula,
            nombre: coordinator.nombre,
            departamento: coordinator.departamento,
            cargo: coordinator.cargo,
            contrato: coordinator.contrato,
            proyecto: coordinator.proyecto,
            correo: coordinator.correo,
            password: coordinator.password

        }, {
            where: { id: coordinator.id },
        });
        return updated > 0;
    }

    async traerCoordinator(): Promise<Coordinator[]> {
        const coordinator = await CoordinatorModel.findAll();
        return coordinator.map(e => new Coordinator(
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