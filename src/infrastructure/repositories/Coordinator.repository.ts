import { Coordinator, CoordinatorDTO } from "../../domain/models/Coordinator";
import { CoordinatorModel } from "../persistence/models/CoordinatorModels";
import { CoordinatorPort } from "../../domain/ports/CoordinatorPort";

export class CoordinatorRepository implements CoordinatorPort {

    async verificarPorCedula(cedula: number): Promise<boolean> {
        const count = await CoordinatorModel.count({ where: { cedula } });
        return count > 0;
    }

    async crearCoordinator(coordinator: Coordinator): Promise<boolean> {
        try {
            const { ...coordinatorData } = coordinator;
            await CoordinatorModel.create(coordinatorData);

            return true;
        } catch (error) {
            return false
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
            proyecto: coordinator.proyecto,
            correo: coordinator.correo,
            password: coordinator.password

        }, {
            where: { id: coordinator.id },
        });
        return updated > 0;
    }

    async traerCoordinator(): Promise<CoordinatorDTO[]> {
        const coordinator = await CoordinatorModel.findAll({
            attributes: { exclude: ['password'] }
        });

        return coordinator.map(e => new CoordinatorDTO(
            e.getDataValue('cedula'),
            e.getDataValue('nombre'),
            e.getDataValue('departamento'),
            e.getDataValue('cargo'),
            e.getDataValue('proyecto'),
            e.getDataValue('correo'),
            e.getDataValue('id')
        ));
    }


    async buscarPorEmail(correo: string): Promise<Coordinator> {
        const coordinador = await CoordinatorModel.findOne({ where: { correo } })
        if (!coordinador) throw new Error("Coordinador no encontrado para" + correo)

        return new Coordinator(
            coordinador.getDataValue('cedula'),
            coordinador.getDataValue('nombre'),
            coordinador.getDataValue('departamento'),
            coordinador.getDataValue('cargo'),
            coordinador.getDataValue('proyecto'),
            coordinador.getDataValue('password'),
            coordinador.getDataValue('correo'),
            coordinador.getDataValue('id')

        );
    }

    async verificarDuplicadosPorEmail(correo: string): Promise<boolean> {
        const count = await CoordinatorModel.count({ where: { correo } });
        return count > 0;
    }
}