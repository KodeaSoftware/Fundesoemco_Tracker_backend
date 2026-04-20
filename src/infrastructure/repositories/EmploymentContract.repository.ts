import { EmployeeContractPort } from '../../domain/ports/EmployeeCotractPort';
import { EmployeeContract } from '../../domain/models/EmployeeContract';
import { EmploymentContractModel } from "../persistence/models/EmploymentContractModel";

export class EmploymentContractRepository implements EmployeeContractPort {

    async crearContrato(contract: EmployeeContract): Promise<EmployeeContract> {
        try {
            const contratoCreado = await EmploymentContractModel.create({
                contract_type: contract.contract_type
            });

            return new EmployeeContract(
                contratoCreado.getDataValue('id'),
                contratoCreado.getDataValue('contract_type')
            );
        } catch (error) {
            console.error("Error al crear contrato en repositorio:", error);
            throw error;
        }
    }

    async listarTiposContrato(): Promise<EmployeeContract[]> {
        const contratos = await EmploymentContractModel.findAll();

        return contratos.map(c => new EmployeeContract(
            c.getDataValue('id'),
            c.getDataValue('contract_type')
        ));
    }

    async obtenerTipoContratoPorId(id: number): Promise<EmployeeContract | null> {
        const contrato = await EmploymentContractModel.findByPk(id);

        if (!contrato) {
            return null;
        }

        return new EmployeeContract(
            contrato.getDataValue('id'),
            contrato.getDataValue('contract_type')
        );
    }
}
