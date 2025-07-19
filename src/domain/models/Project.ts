import { v4 as uuidv4 } from 'uuid';

export class Project {
    constructor(
        public titulo: string,
        public descripcion: string,
        public creadoEn: Date,
        public jornada: {
            horaEntrada: string,
            horaSalida: string
        },
        public id?: string
    ) {
        this.id = id ?? uuidv4()
    }
    validarDatos(): void {
        if (!this.titulo) throw new Error("Falta titulo de proyecto")
    }
} 