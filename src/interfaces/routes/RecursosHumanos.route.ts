import { createRecursosHumanos, deleteRecursosHumanos, editRecursosHumanos, getAllRecursosHumanos } from "../../interfaces/controllers/RecursosHumanos.controller";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const RecursosHumanosRoute = Router()

// Create new Recursos Humanos
RecursosHumanosRoute.post("/api/recursos-humanos", authMiddleware, createRecursosHumanos)
RecursosHumanosRoute.get("/api/recursos-humanos", authMiddleware, getAllRecursosHumanos)
RecursosHumanosRoute.put("/api/recursos-humanos", authMiddleware, editRecursosHumanos)
RecursosHumanosRoute.delete("/api/recursos-humanos/:id", authMiddleware, deleteRecursosHumanos)

export default RecursosHumanosRoute 