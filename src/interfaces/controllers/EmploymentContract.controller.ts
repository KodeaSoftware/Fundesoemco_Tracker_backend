import { getAllEmploymentContractTypes } from "../../application/usecases/ContractTypes/getContractTypesUseCase";
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