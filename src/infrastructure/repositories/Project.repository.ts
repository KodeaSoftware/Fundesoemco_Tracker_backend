import { Project } from "../../domain/models/Project";
import { ProjectModel } from "../persistence/models/ProjectModel";
import { ProjectPort } from "../../domain/ports/ProjectPort";

export class ProjectRepository implements ProjectPort {

    async verificarPorTitulo(titulo: string): Promise<string | null> {
        const project = await ProjectModel.findOne({ where: { titulo } });
        if (project) {
            return project.getDataValue('id');
        }
        return null;
    }

    async crearProject(project: Project): Promise<boolean> {
        try {
            const { ...projectData } = project;
            console.log(projectData)
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
            jornada: project.jornada,
            estado: project.estado
        }, {
            where: { id: project.id },
        });
        return updated > 0;
    }

    async traerProject(): Promise<Project[]> {
        const projects = await ProjectModel.findAll();
        return projects.map(p => {
            const jornadaData = p.getDataValue('jornada');
            return new Project(
                p.getDataValue('titulo'),
                p.getDataValue('descripcion'),
                {
                    horaEntrada: new Date(jornadaData.horaEntrada),
                    horaSalida: new Date(jornadaData.horaSalida)
                },
                new Date(p.getDataValue('creadoEn')),
                p.getDataValue('id'),
                p.getDataValue('estado')
            );
        });
    }

    async traerProjectPorId(id: string): Promise<Project | null> {
        const project = await ProjectModel.findByPk(id);
        if (!project) return null;

        const jornadaData = project.getDataValue('jornada');
        return new Project(
            project.getDataValue('titulo'),
            project.getDataValue('descripcion'),
            {
                horaEntrada: jornadaData?.horaEntrada ? new Date(jornadaData.horaEntrada) : new Date(),
                horaSalida: jornadaData?.horaSalida ? new Date(jornadaData.horaSalida) : new Date()
            },
            new Date(project.getDataValue('creadoEn')),
            project.getDataValue('id'),
            project.getDataValue('estado')
        );
    }
} 