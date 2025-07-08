import { v4 as uuidv4 } from 'uuid';

export class RecursosHumanos {
    constructor(
        public cedula: number,
        public nombre: string,
        public cargo: string,
        public correo: string,
        public password: string,
        public id?: string,
    ) {
        this.id = id ?? uuidv4();
    }
    validarDatos(): void {
        if (!this.cedula) throw new Error("Falta cédula")
        if (!this.nombre) throw new Error("Falta nombre")
        if (!this.cargo) throw new Error("Falta cargo")
    }
}