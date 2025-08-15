import { createProjectUseCase } from "../../application/usecases/Projects/createProjectUseCase";
import { getAllProjectsUseCase } from "../../application/usecases/Projects/getAllProjectsUseCase";
import { deleteProjectUseCase } from "../../application/usecases/Projects/deleteProjectUseCase";
import { editProjectUseCase } from "../../application/usecases/Projects/editProjectUseCase";
import { Request, Response } from "express";
import { Project } from "../../domain/models/Project";
import { getProjectById } from "../../application/usecases/Projects/getProjectById";


export async function createProject(req: Request, res: Response) {
    try {
        const raw = req.body;

        const project = new Project(
            raw.titulo,
            raw.descripcion,
            new Date(raw.creadoEn),
            {
                horaEntrada: new Date(raw.jornada.horaEntrada),
                horaSalida: new Date(raw.jornada.horaSalida),
            },
            raw.id // opcional, se autogenera si no se pasa
        );

        project.validarDatos();

        const projectCreated = await createProjectUseCase(project);

        if (!projectCreated) {
            throw new Error("Failed to create a new Project");
        }

        res.status(200).json(projectCreated);

    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export async function getAllProject(req: Request, res: Response) {
    try {
        const projectList = await getAllProjectsUseCase()
        if (!projectList) throw new Error("Failed to get Project list")
        res.status(200).json(projectList)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function editProject(req: Request, res: Response) {
    try {
        const dataProject = req.body
        const editProject = await editProjectUseCase(dataProject)
        if (!editProject) throw new Error("Failed to edit Project")
        res.status(200).json(editProject)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

export async function deleteProject(req: Request, res: Response) {
    try {
        const idProject = req.params.id
        const deleteProjectData = await deleteProjectUseCase(idProject)
        if (!deleteProjectData) throw new Error("Failed to delete Project")
        res.status(200).json(deleteProjectData)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}