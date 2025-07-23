import { ProjectService } from "../../services/Project.serviceInstance";

export async function getProjectById(id: string) {
    return await ProjectService.traerProjectPorId(id)
}