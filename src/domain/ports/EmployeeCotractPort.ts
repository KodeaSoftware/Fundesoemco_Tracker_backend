/**
 * Puerto para operaciones de employee_contract
 * Define el contrato que deben cumplir los adaptadores de infraestructura.
 * @param contrac_type => tipo de contrato
 * @param id => id para cada tipo de contrato 
 */

import { EmployeeContract } from "../models/EmployeeContract";

export interface EmployeeContractPort {
    crearContrato(contract_type: EmployeeContract): Promise<EmployeeContract>
    listarTiposContrato(): Promise<EmployeeContract[]>

}


