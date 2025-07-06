import { v4 as uuidv4 } from 'uuid';
export class Coordinator {
    constructor(
        public cedula: number,
        public nombre: string,
        public departamento: string,
        public cargo: string,
        public proyecto: string,
        public password: string,
        public correo: string,
        public id?: string,
    ) {
        this.id = id ?? uuidv4();
    }

    validarDatos(): void {
        if (!this.cedula) throw new Error("Falta cédula")
    }
}

// Para devolver Coordinator al frontend sin password
export class CoordinatorDTO {
    constructor(
        public cedula: number,
        public nombre: string,
        public departamento: string,
        public cargo: string,
        public proyecto: string,
        public correo: string,
        public id: string
    ) { }
}