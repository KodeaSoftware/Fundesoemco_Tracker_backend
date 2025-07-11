import { Project } from "../../domain/models/Project";
import { ProjectModel } from "../persistence/models/ProjectModel";
import { ProjectPort } from "../../domain/ports/ProjectPort";

export class ProjectRepository implements ProjectPort {

    async verificarPorTitulo(titulo: string): Promise<boolean> {
        const count = await ProjectModel.count({ where: { titulo } });
        return count > 0;
    }

    async crearProject(project: Project): Promise<boolean> {
        try {
            const { id, ...projectData } = project;
            await ProjectModel.create(projectData);
            return true;
        } catch (error) {
            return false;
        }
    }

    async eliminarProject(id: string): Promise<boolean> {
        const deleted = await ProjectModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async editarProject(project: Project): Promise<boolean> {
        const [updated] = await ProjectModel.update({
            titulo: project.titulo,
            descripcion: project.descripcion,
            creadoEn: project.creadoEn,
            horarios: project.horarios,
            coordinadores: project.coordinadores,
            empleadosDirectos: project.empleadosDirectos,
            contratistas: project.contratistas
        }, {
            where: { id: project.id },
        });
        return updated > 0;
    }

    async traerProject(): Promise<Project[]> {
        const projects = await ProjectModel.findAll();
        return projects.map(p => new Project(
            p.getDataValue('titulo'),
            p.getDataValue('descripcion'),
            p.getDataValue('creadoEn'),
            p.getDataValue('horarios'),
            p.getDataValue('coordinadores'),
            p.getDataValue('empleadosDirectos'),
            p.getDataValue('contratistas'),
            p.getDataValue('id')
        ));
    }

    async traerProjectPorId(id: string): Promise<Project | null> {
        const project = await ProjectModel.findByPk(id);
        if (!project) return null;

        return new Project(
            project.getDataValue('titulo'),
            project.getDataValue('descripcion'),
            project.getDataValue('creadoEn'),
            project.getDataValue('horarios'),
            project.getDataValue('coordinadores'),
            project.getDataValue('empleadosDirectos'),
            project.getDataValue('contratistas'),
            project.getDataValue('id')
        );
    }
} 