import { v4 as uuidv4 } from 'uuid';

export class ProjectAssignamentCoordinator {
    constructor(
        public idProject: string,
        public idCoordinator: string | undefined,
        public id?: string,
    ) {
        this.id = id ?? uuidv4();
    }
    validarDatos(): void {
        if (!this.idProject || !this.idCoordinator) throw new Error("Falta IdPorject, idCoordinator")
    }
}