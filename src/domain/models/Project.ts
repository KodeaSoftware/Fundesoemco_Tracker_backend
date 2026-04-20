import { v4 as uuidv4 } from 'uuid';

export class Project {
    constructor(
        public titulo: string,
        public descripcion: string,
        public jornada: {
            horaEntrada: Date,
            horaSalida: Date
        },
        public creadoEn?: Date,
        public id?: string,
        public estado: string = 'activo'
    ) {
        this.id = id ?? uuidv4()
    }
}