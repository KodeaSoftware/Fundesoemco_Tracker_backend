import { createProject, deleteProject, editProject, getAllProject } from "../../interfaces/controllers/Project.controller";
import { Router } from "express";
const ProjectRoute = Router()

// Create new Project
ProjectRoute.post("/api/project", createProject)
ProjectRoute.get("/api/project", getAllProject)
ProjectRoute.put("/api/project", editProject)
ProjectRoute.delete("/api/project/:id", deleteProject)

export default ProjectRoute 