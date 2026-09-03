import { createProject, deleteProject, editProject, getAllProject, getProjectByIdController } from "../../interfaces/controllers/Project.controller";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const ProjectRoute = Router()

// Create new Project
ProjectRoute.post("/api/project", authMiddleware, createProject)
ProjectRoute.get("/api/project", authMiddleware, getAllProject)
ProjectRoute.put("/api/project", authMiddleware, editProject)
ProjectRoute.get("/api/project/:id", authMiddleware, getProjectByIdController)
ProjectRoute.delete("/api/project/:id", authMiddleware, deleteProject)

export default ProjectRoute 
