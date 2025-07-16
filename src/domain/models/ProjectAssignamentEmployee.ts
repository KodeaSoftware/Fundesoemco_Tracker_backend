import { v4 as uuidv4 } from 'uuid';

export class ProjectAssignamentEmployee {
    constructor(
        public idProject: string,
        public idEmployee: string,
    ) { }
    validarDatos(): void {
        if (!this.idProject || !this.idEmployee) throw new Error("Falta IdPorject, idEmployee")
    }
}