import { EmploymentContractService } from "../../services/EmploymentContract.serviceInstance";

export async function getAllEmploymentContractTypes() {
    return await EmploymentContractService.listarTiposContrato()
}