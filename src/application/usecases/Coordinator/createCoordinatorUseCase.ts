import { CoordinatorService } from "../../services/Coordinator.serviceInstance";
import { Coordinator } from "../../../domain/models/Coordinator";
import bcrypt from "bcrypt"
import { ProjectAssignamentCoordinator } from "../../../domain/models/ProjectAssignamentCoordinator";
import { ProjectAssignamentCoordinatorService } from "../../services/ProjectAassignamentCoordinator.serviceInstance";

export async function createCoordinatorUseCase(coordinator: Coordinator) {

    const { cedula, password, correo } = coordinator
    if (!password) throw new Error("Falta contraseña")
    if (!cedula) throw new Error("Falta cédula")
    if (!correo) throw new Error("Falta correo")

    const isCreated = await CoordinatorService.verificarPorCedula(cedula)
    if (isCreated) throw new Error(`Ya existe un coordinador con la cédula ${cedula}`)

    const searchByEmail = await CoordinatorService.verificarDuplicadosPorEmail(correo)
    if (searchByEmail) throw new Error("Ya existe una cuenta con " + correo)

    // Ensure proyecto is an array
    if (!coordinator.proyecto) coordinator.proyecto = [];
    if (!Array.isArray(coordinator.proyecto)) coordinator.proyecto = [coordinator.proyecto];

    // Password Hashing
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (bcryptError) {
        console.error(">>> [USECASE] Error hashing password:", bcryptError);
        throw new Error("Error procesando la seguridad de la cuenta");
    }
    coordinator.password = hashedPassword

    const coordinatorCreated = await CoordinatorService.crearCoordinator(coordinator)
    if (!coordinatorCreated) throw new Error("La base de datos no devolvió el coordinador creado")

    const idCoordinator = coordinatorCreated.id

    // Itera por cada UUID de proyecto que tiene coordinator para asignarlo a estos mismos 
    const projectAssignmanet = await Promise.all(
        coordinator.proyecto
            .flat() // Asegurar que sea plano
            .filter(idProject => typeof idProject === 'string' && idProject.trim() !== "") // Filtrar vacíos
            .map(async idProject => {
                const ProjectAssignamentData = new ProjectAssignamentCoordinator(idProject, idCoordinator)
                return await ProjectAssignamentCoordinatorService.asignarProyecto(ProjectAssignamentData);
            })
    );
    return {
        projectAssignament: projectAssignmanet,
        status: "Created",
        id: coordinator.id,
        cc: coordinator.cedula,
        name: coordinator.nombre,
        email: coordinator.correo,
        coordinatorObject: coordinatorCreated
    }
}
