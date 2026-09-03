import { EmploymentContractService } from "../../services/EmploymentContract.serviceInstance";
import { EmployeeContract } from "../../../domain/models/EmployeeContract";

export async function editContractTypeUseCase(contractData: { id: number; contract_type: string }) {
    if (!contractData.id) {
        throw new Error("El id del contrato es requerido");
    }
    if (!contractData.contract_type) {
        throw new Error("El nombre del tipo de contrato es requerido");
    }

    const contract = new EmployeeContract(contractData.id, contractData.contract_type);
    const updated = await EmploymentContractService.editarContrato(contract);

    if (!updated) {
        throw new Error(`No se pudo actualizar el tipo de contrato con ID ${contractData.id}`);
    }

    return {
        state: "Updated",
        id: contractData.id,
        contract_type: contractData.contract_type
    };
}
