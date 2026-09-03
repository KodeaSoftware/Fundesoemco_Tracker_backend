import { EmploymentContractService } from "../../services/EmploymentContract.serviceInstance";

export async function deleteContractTypeUseCase(id: number) {
    if (!id) {
        throw new Error("El id del contrato es requerido");
    }

    const deleted = await EmploymentContractService.eliminarContrato(id);

    if (!deleted) {
        throw new Error(`No se pudo eliminar el tipo de contrato con ID ${id}`);
    }

    return {
        state: "Deleted",
        id: id,
        message: "Tipo de contrato eliminado correctamente"
    };
}
