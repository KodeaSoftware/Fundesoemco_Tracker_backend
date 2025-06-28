import { RecursosHumanos } from "../../domain/models/RecursosHumanos";
import { RecursosHumanosPort } from "../../domain/ports/RecursosHumanos";
import { RecursosHumanosRepository } from "../repositories/RecursosHumanos.repository";

export class RecursosHumanosAdapter implements RecursosHumanosPort {

    // Instancia del repositorio para el adapter
    private repository = new RecursosHumanosRepository()

    verificarPorCedula(cedula: number): Promise<boolean> {
        return this.repository.verificarPorCedula(cedula)
    }

    crearRecursosHumanos(recursosHumanos: RecursosHumanos): Promise<boolean> {
        return this.repository.crearRecursosHumanos(recursosHumanos)
    }

    editarRecursosHumanos(recursosHumanos: RecursosHumanos): Promise<boolean> {
        return this.repository.editarRecursosHumanos(recursosHumanos)
    }

    eliminarRecursosHumanos(id: string): Promise<boolean> {
        return this.repository.eliminarRecursosHumanos(id)
    }

    traerRecursosHumanos(): Promise<RecursosHumanos[]> {
        return this.repository.traerRecursosHumanos()
    }
} 