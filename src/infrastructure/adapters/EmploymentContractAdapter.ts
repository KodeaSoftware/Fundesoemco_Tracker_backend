import { EmployeeContract } from "../../domain/models/EmployeeContract";
import { EmployeeContractPort } from "../../domain/ports/EmployeeCotractPort";
import { EmploymentContractRepository } from "../repositories/EmploymentContract.repository";

export class EmploymentContractAdapter implements EmployeeContractPort {

    private repository = new EmploymentContractRepository();

    async crearContrato(contract_type: EmployeeContract): Promise<EmployeeContract> {
        return await this.repository.crearContrato(contract_type);
    }

    async listarTiposContrato(): Promise<EmployeeContract[]> {
        return await this.repository.listarTiposContrato();
    }

    async obtenerTipoContratoPorId(id: number): Promise<EmployeeContract | null> {
        return await this.repository.obtenerTipoContratoPorId(id);
    }
}
