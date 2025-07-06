import { createCoordinatorUseCase } from "../../application/usecases/Coordinator/createCoordinatorUseCase";
import { Request, Response } from "express";
import { loginCoordinatorUseCase } from "../../application/usecases/Coordinator/loginCoordinatorUseCase";
import { getAllCoordinatorUseCase } from "../../application/usecases/Coordinator/getAllCoordinatorUseCase";
import { deleteCoordinatorUseCase } from "../../application/usecases/Coordinator/deleteCoordinatorUseCase";
import { editCoordinatorUseCase } from "../../application/usecases/Coordinator/editCoordinatorUseCase";

export async function createCoordinator(req: Request, res: Response) {
    try {
        const coordinatorData = req.body
        console.log(coordinatorData)
        const coordinatorCreated = await createCoordinatorUseCase(coordinatorData)
        if (!coordinatorCreated) throw new Error("Failded to create a new Coordinator")
        res.status(200).json(coordinatorCreated)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function loginCoordinator(req: Request, res: Response) {
    try {
        const { correo, password } = req.body
        const coordinatorLogin = await loginCoordinatorUseCase(correo, password)
        if (!coordinatorLogin) throw new Error("Failded to create a new Coordinator")
        res.status(200).json(coordinatorLogin)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}


export async function getAllCoordinator(req: Request, res: Response) {
    try {
        const coordinatorList = await getAllCoordinatorUseCase()
        if (!coordinatorList) throw new Error("Failded to get a coordinator list")
        res.status(200).json(coordinatorList)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function deleteCoordinator(req: Request, res: Response) {
    try {
        const idCoordinator = req.params.id
        const deleteCoordinator = await deleteCoordinatorUseCase(idCoordinator)
        if (!deleteCoordinator) throw new Error("Failded to edit a Employee")
        res.status(200).json(deleteCoordinator)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function editCoordinator(req: Request, res: Response) {
    try {
        const dataCoordinator = req.body
        const editEmployee = await editCoordinatorUseCase(dataCoordinator)
        if (!editEmployee) throw new Error("Failded to edit a Employee")
        res.status(200).json(editEmployee)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

