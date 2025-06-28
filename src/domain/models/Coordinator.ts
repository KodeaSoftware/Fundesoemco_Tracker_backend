export class Coordinator {
    constructor(
        public id: string,
        public cedula: number,
        public nombre: string,
        public departamento: string,
        public cargo: string,
        public contrato: string,
        public proyecto: string,
        public password: string,
        public correo: string
    ) { }
    validarDatos(): void {
        if (!this.cedula) throw new Error("Falta cédula")
    }

}