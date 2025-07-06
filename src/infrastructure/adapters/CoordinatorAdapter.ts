import { Coordinator, CoordinatorDTO } from "../../domain/models/Coordinator";
import { CoordinatorPort } from "../../domain/ports/CoordinatorPort";
import { CoordinatorRepository } from "../repositories/Coordinator.repository";

export class CoordinatorAdapter implements CoordinatorPort {

    // Instancia del repositorio para el adapter
    private repository = new CoordinatorRepository()

    verificarPorCedula(cedula: number): Promise<boolean> {
        return this.repository.verificarPorCedula(cedula)
    }

    crearCoordinator(coordinator: Coordinator): Promise<boolean> {
        return this.repository.crearCoordinator(coordinator)
    }

    editarCoordinator(coordinator: Coordinator): Promise<boolean> {
        return this.repository.editarCoordinator(coordinator)
    }

    eliminarCoordinator(id: string): Promise<boolean> {
        return this.repository.eliminarCoordinator(id)
    }

    traerCoordinator(): Promise<CoordinatorDTO[]> {
        return this.repository.traerCoordinator()
    }

    buscarPorEmail(correo: string): Promise<Coordinator> {
        return this.repository.buscarPorEmail(correo)
    }

}