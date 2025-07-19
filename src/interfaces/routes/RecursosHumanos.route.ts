import { createRecursosHumanos, deleteRecursosHumanos, editRecursosHumanos, getAllRecursosHumanos } from "../../interfaces/controllers/RecursosHumanos.controller";
import { Router } from "express";
const RecursosHumanosRoute = Router()

// Create new Recursos Humanos
RecursosHumanosRoute.post("/api/recursos-humanos", createRecursosHumanos)
RecursosHumanosRoute.get("/api/recursos-humanos", getAllRecursosHumanos)
RecursosHumanosRoute.put("/api/recursos-humanos", editRecursosHumanos)
RecursosHumanosRoute.delete("/api/recursos-humanos/:id", deleteRecursosHumanos)

export default RecursosHumanosRoute 