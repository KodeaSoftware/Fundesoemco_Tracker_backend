import { v4 as uuidv4 } from 'uuid';

export class Employee {
    constructor(
        public cedula: number,
        public nombre: string,
        public departamento: string,
        public cargo: string,
        public contrato: string,
        public proyecto: string[],
        public telefono: number,
        public id?: string,
    ) {
        this.id = id ?? uuidv4();
    }
    validarDatos(): void {
        if (!this.cedula) throw new Error("Falta cédula")
    }

}