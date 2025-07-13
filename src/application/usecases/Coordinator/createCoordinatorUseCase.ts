import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { Coordinator } from "../../../domain/models/Coordinator";
import bcrypt from "bcrypt"

export async function createCoordinatorUseCase(coordinator: Coordinator) {

    const { cedula, password, correo } = coordinator
    if (!password) throw new Error("Falta contraseña")
    if (!cedula) throw new Error("Falta cédula")
    if (!correo) throw new Error("Falta correo")

    const isCreated = await CoordinatorService.verificarPorCedula(cedula)
    if (isCreated) throw new Error(`Ya existe un coordinador con la cédula ${cedula}`)

    const searchByEmail = await CoordinatorService.verificarDuplicadosPorEmail(correo)
    if (searchByEmail) throw new Error("Ya existe una cuenta con " + correo)

    //password
    const hashedPassword = await bcrypt.hash(password, 10)
    coordinator.password = hashedPassword

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
