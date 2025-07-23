import { v4 as uuidv4 } from 'uuid';

export class Employee {
    constructor(
        public cedula: number,
        public nombre: string,
        public departamento: string,
        public cargo: string,
        public contrato: number,
        public proyecto: string[],
        public telefono: number,
        public id?: string,
        public tipoContrato?: string,
        public nombreProject?: string[]
    ) {
        this.id = id ?? uuidv4();
    }
    validarDatos(): void {
        if (!this.cedula) throw new Error("Falta cédula")
    }
}