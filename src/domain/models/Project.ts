import { v4 as uuidv4 } from 'uuid';

export class Project {
    constructor(
        public titulo: string,
        public descripcion: string,
        public creadoEn: Date,
        public jornada: {
            horaEntrada: Date,
            horaSalida: Date
        },
        public id?: string
    ) {
        this.id = id ?? uuidv4()
    }
} 