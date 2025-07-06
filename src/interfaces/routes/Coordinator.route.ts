import { createCoordinator, getAllCoordinator, loginCoordinator, editCoordinator, deleteCoordinator } from "../controllers/Coordinator.controller";
import { Router } from "express";
const CoordinatorRoute = Router()


CoordinatorRoute.post("/api/coordinator", createCoordinator)
CoordinatorRoute.post("/api/coordinator/login", loginCoordinator)
CoordinatorRoute.get("/api/coordinator", getAllCoordinator)
CoordinatorRoute.put("/api/coordinator", editCoordinator)
CoordinatorRoute.delete("/api/coordinator/:id", deleteCoordinator)

export default CoordinatorRoute
