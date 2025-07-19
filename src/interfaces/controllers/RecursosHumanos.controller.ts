import { createRecursosHumanosUseCase } from "../../application/usecases/RecursosHumanos/createRecursosHumanosUseCase";
import { getAllRecursosHumanosUseCase } from "../../application/usecases/RecursosHumanos/getAllRecursosHumanosUseCase";
import { deleteRecursosHumanosUseCase } from "../../application/usecases/RecursosHumanos/deleteRecursosHumanosUseCase";
import { editRecursosHumanosUseCase } from "../../application/usecases/RecursosHumanos/editRecursosHumanosUseCase";
import { Request, Response } from "express";

export async function createRecursosHumanos(req: Request, res: Response) {
    try {
        const dataRecursosHumanos = req.body
        const recursosHumanosCreated = await createRecursosHumanosUseCase(dataRecursosHumanos)
        if (!recursosHumanosCreated) throw new Error("Failed to create a new Recursos Humanos")
        res.status(200).json(recursosHumanosCreated)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function getAllRecursosHumanos(req: Request, res: Response) {
    try {
        const recursosHumanosList = await getAllRecursosHumanosUseCase()
        if (!recursosHumanosList) throw new Error("Failed to get Recursos Humanos list")
        res.status(200).json(recursosHumanosList)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function editRecursosHumanos(req: Request, res: Response) {
    try {
        const dataRecursosHumanos = req.body
        const editRecursosHumanos = await editRecursosHumanosUseCase(dataRecursosHumanos)
        if (!editRecursosHumanos) throw new Error("Failed to edit Recursos Humanos")
        res.status(200).json(editRecursosHumanos)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function deleteRecursosHumanos(req: Request, res: Response) {
    try {
        const idRecursosHumanos = req.params.id
        const deleteRecursosHumanosData = await deleteRecursosHumanosUseCase(idRecursosHumanos)
        if (!deleteRecursosHumanosData) throw new Error("Failed to delete Recursos Humanos")
        res.status(200).json(deleteRecursosHumanosData)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
} 