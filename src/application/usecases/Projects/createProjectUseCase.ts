import { ProjectService } from "../../services/Project.serviceInstance";
import { Project } from "../../../domain/models/Project";

export async function createProjectUseCase(project: Project) {

    const projectCreated = await ProjectService.crearProject(project)
    if (!projectCreated) throw new Error("Error al crear el proyecto")



    return {
        status: "Created",
    }
}