import { getAllEmploymentContractTypes } from "../../application/usecases/ContractTypes/getContractTypesUseCase";
import { createContractTypeUseCase } from "../../application/usecases/ContractTypes/createContractTypeUseCase";
import { editContractTypeUseCase } from "../../application/usecases/ContractTypes/editContractTypeUseCase";
import { deleteContractTypeUseCase } from "../../application/usecases/ContractTypes/deleteContractTypeUseCase";
import { Request, Response } from "express";

export async function getAllContractTypes(req: Request, res: Response) {
    try {
        const contractList = await getAllEmploymentContractTypes();
        if (!contractList) throw new Error("Failed to get a list of contractTypes");
        res.status(200).json(contractList);
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err });
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

export async function editContractType(req: Request, res: Response) {
    try {
        const contractData = req.body;
        const updated = await editContractTypeUseCase(contractData);
        res.status(200).json(updated);
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error: " + (err?.message || err) });
    }
}

export async function deleteContractType(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const deleted = await deleteContractTypeUseCase(id);
        res.status(200).json(deleted);
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error: " + (err?.message || err) });
    }
}