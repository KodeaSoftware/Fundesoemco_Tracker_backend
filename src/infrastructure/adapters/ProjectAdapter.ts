import { Project } from "../../domain/models/Project";
import { ProjectPort } from "../../domain/ports/ProjectPort";
import { ProjectRepository } from "../repositories/Project.repository";

export class ProjectAdapter implements ProjectPort {

    // Instancia del repositorio para el adapter
    private repository = new ProjectRepository()

    verificarPorTitulo(titulo: string): Promise<string | null> {
        return this.repository.verificarPorTitulo(titulo)
    }

    crearProject(project: Project): Promise<boolean> {
        return this.repository.crearProject(project)
    }

    editarProject(project: Project): Promise<boolean> {
        return this.repository.editarProject(project)
    }

    eliminarProject(id: string): Promise<boolean> {
        return this.repository.eliminarProject(id)
    }

    traerProject(): Promise<Project[]> {
        return this.repository.traerProject()
    }

    traerProjectPorId(id: string): Promise<Project | null> {
        return this.repository.traerProjectPorId(id)
    }
} 