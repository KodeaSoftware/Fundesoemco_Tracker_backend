import { getAllEmploymentContractTypes } from "../../application/usecases/ContractTypes/getContractTypesUseCase";
import { createContractTypeUseCase } from "../../application/usecases/ContractTypes/createContractTypeUseCase";
import { Request, Response } from "express";


export async function getAllContractTypes(req: Request, res: Response) {
    try {
        const contractList = await getAllEmploymentContractTypes()
        if (!contractList) throw new Error("Failded to get a list of contractTypes")
        res.status(200).json(contractList)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function createContractType(req: Request, res: Response) {
    try {
        const contractData = req.body;
        const contractCreated = await createContractTypeUseCase(contractData);
        if (!contractCreated) throw new Error("Failed to create a new Contract Type");
        res.status(201).json(contractCreated);
    } catch (err) {
        res.status(500).send({ message: "Internal server error: " + err });
    }
}