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

    validarDatos(): void {
        if (!this.titulo || this.titulo.trim() === '') {
            throw new Error("Falta titulo de proyecto")
        }

        if (!this.descripcion || this.descripcion.trim() === '') {
            throw new Error("Falta descripción del proyecto")
        }

        if (!this.creadoEn || isNaN(this.creadoEn.getTime())) {
            throw new Error("Fecha de creación inválida")
        }

        if (!this.jornada || !this.jornada.horaEntrada || !this.jornada.horaSalida) {
            throw new Error("Jornada laboral incompleta")
        }

        if (isNaN(this.jornada.horaEntrada.getTime())) {
            throw new Error("Hora de entrada inválida")
        }

        if (isNaN(this.jornada.horaSalida.getTime())) {
            throw new Error("Hora de salida inválida")
        }

        if (this.jornada.horaEntrada >= this.jornada.horaSalida) {
            throw new Error("La hora de entrada debe ser anterior a la hora de salida")
        }

        // Validar que las fechas no sean del futuro
        const now = new Date();
        if (this.creadoEn > now) {
            throw new Error("La fecha de creación no puede ser futura")
        }
    }
} 