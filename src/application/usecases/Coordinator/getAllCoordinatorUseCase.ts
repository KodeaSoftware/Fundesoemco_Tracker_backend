import { CoordinatorService } from "../../services/Coordinator.serviceInstance";

export async function getAllCoordinatorUseCase() {
    const coordinatorList = await CoordinatorService.traerCoordinator()


    return {
        Data: coordinatorList
    }
}