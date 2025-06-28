import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { Coordinator } from "../../../domain/models/Coordinator";

export async function createCoordinatorUseCase(coordinator: Coordinator) {

    const { cedula } = coordinator
    const isCreated = await CoordinatorService.verificarPorCedula(cedula)
    if (isCreated) throw new Error(`Ya existe un coordinador con la cédula ${cedula}`)

    const coordinatorCreated = await CoordinatorService.crearCoordinator(coordinator)
    if (!coordinatorCreated) throw new Error("Error al crear el coordinador")

    return {
        status: "Created",
        id: coordinator.id,
        cc: coordinator.cedula,
        name: coordinator.nombre,
        email: coordinator.correo
    }
}