export class RecursosHumanos {
    constructor(
        public cedula: number,
        public nombre: string,
        public cargo: string,
        public id?: string,
        public correo?: string,
        public password?: string
    ) { }

    validarDatos(): void {
        if (!this.cedula) throw new Error("Falta cédula")
        if (!this.nombre) throw new Error("Falta nombre")
        if (!this.cargo) throw new Error("Falta cargo")
    }
}