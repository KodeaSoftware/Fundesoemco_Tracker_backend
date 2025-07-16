import { ProjectService } from "../../services/Project.serviceInstance";

export async function getAllProjectsUseCase() {
    return await ProjectService.traerProject()
}