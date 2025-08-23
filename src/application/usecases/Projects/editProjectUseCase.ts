import { ProjectService } from "../../services/Project.serviceInstance";
import { Project } from "../../../domain/models/Project";

export async function editProjectUseCase(project: Project) {
    if (!project) throw new Error("Error interno al ingresar el proyecto a editar")

    const editedProject = await ProjectService.editarProject(project)
    if (!editedProject) throw new Error("Error interno al editar el proyecto")

    return {
        status: editedProject
    }
}