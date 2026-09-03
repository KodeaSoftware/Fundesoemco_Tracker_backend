import { createCoordinator, getAllCoordinator, editCoordinator, deleteCoordinator } from "../controllers/Coordinator.controller";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const CoordinatorRoute = Router()


CoordinatorRoute.post("/api/coordinator", authMiddleware, createCoordinator)

CoordinatorRoute.get("/api/coordinator", authMiddleware, getAllCoordinator)
CoordinatorRoute.put("/api/coordinator", authMiddleware, editCoordinator)
CoordinatorRoute.delete("/api/coordinator/:id", authMiddleware, deleteCoordinator)

export default CoordinatorRoute
