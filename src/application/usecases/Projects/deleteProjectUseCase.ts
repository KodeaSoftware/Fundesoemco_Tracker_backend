import { ProjectService } from "../../services/Project.serviceInstance";

export async function deleteProjectUseCase(idProject: string) {
    return await ProjectService.eliminarProject(idProject)
}