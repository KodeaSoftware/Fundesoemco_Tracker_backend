import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { Coordinator } from "../../../domain/models/Coordinator";
import bcrypt from "bcrypt"

export async function editCoordinatorUseCase(coordinator: Coordinator) {
    const { cedula } = coordinator
    const { password } = coordinator

    const hashedPassword = await bcrypt.hash(password, 10)
    coordinator.password = hashedPassword

    const isCreated = await CoordinatorService.verificarPorCedula(cedula)
    if (!isCreated) throw new Error(`No existe un coordinador con la cédula ${cedula} imposible editar`)

    const isUpdated = await CoordinatorService.editarCoordinator(coordinator)
    if (!isUpdated) throw new Error("Error al actualizar el coordinador" + cedula)

    return {
        state: "Updated",
        id: coordinator.id
    }
}