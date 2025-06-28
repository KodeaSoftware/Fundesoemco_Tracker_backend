import { RecursosHumanosService } from "../../services/RecursosHumanos.serviceInstance";

export async function getAllRecursosHumanosUseCase() {
    const recursosHumanosList = await RecursosHumanosService.traerRecursosHumanos()

    return {
        Data: recursosHumanosList
    }
}