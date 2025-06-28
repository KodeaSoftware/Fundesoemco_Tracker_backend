export class Coordinator {
    constructor(
        public cedula: number,
        public nombre: string,
        public departamento: string,
        public cargo: string,
        public contrato: string,
        public proyecto: string,
        public id?: string,
        public correo?: string,
        public password?: string
    ) { }

    validarDatos(): void {
        if (!this.cedula) throw new Error("Falta cédula")
    }
}