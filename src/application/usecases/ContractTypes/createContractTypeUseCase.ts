import { EmploymentContractService } from "../../services/EmploymentContract.serviceInstance";
import { EmployeeContract } from "../../../domain/models/EmployeeContract";

export async function createContractTypeUseCase(contractData: { contract_type: string }) {
    if (!contractData.contract_type) {
        throw new Error("El tipo de contrato es requerido");
    }

    // El ID se autogenera en la base de datos
    const newContract = new EmployeeContract(0, contractData.contract_type);
    
    return await EmploymentContractService.crearContrato(newContract);
}
