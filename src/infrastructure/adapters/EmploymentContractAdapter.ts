import { EmployeeContract } from "../../domain/models/EmployeeContract";
import { EmployeeContractPort } from "../../domain/ports/EmployeeContractPort";
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

    async editarContrato(contract: EmployeeContract): Promise<boolean> {
        return await this.repository.editarContrato(contract);
    }

    async eliminarContrato(id: number): Promise<boolean> {
        return await this.repository.eliminarContrato(id);
    }
}
