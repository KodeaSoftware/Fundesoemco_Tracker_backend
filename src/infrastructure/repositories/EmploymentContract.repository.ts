import { EmployeeContractPort } from '../../domain/ports/EmployeeCotractPort';
import { EmployeeContract } from '../../domain/models/EmployeeContract';
import { EmploymentContractModel } from "../persistence/models/EmploymentContractModel";

export class EmploymentContractRepository implements EmployeeContractPort {

    async crearContrato(contract_type: EmployeeContract): Promise<EmployeeContract> {
        const contratoCreado = await EmploymentContractModel.create({
            id: contract_type.id,
            contract_type: contract_type.contract_type
        });

        return new EmployeeContract(
            contratoCreado.getDataValue('id'),
            contratoCreado.getDataValue('contract_type')
        );
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
