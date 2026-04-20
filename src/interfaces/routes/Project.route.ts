import { createProject, deleteProject, editProject, getAllProject, getProjectByIdController } from "../../interfaces/controllers/Project.controller";
import { Router } from "express";
const ProjectRoute = Router()

// Create new Project
ProjectRoute.post("/api/project", createProject)
ProjectRoute.get("/api/project", getAllProject)
ProjectRoute.put("/api/project", editProject)
ProjectRoute.get("/api/project/:id", getProjectByIdController)
ProjectRoute.delete("/api/project/:id", deleteProject)

export default ProjectRoute 
