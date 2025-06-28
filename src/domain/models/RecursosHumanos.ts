export class RecursosHumanos {
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
        if (!this.nombre) throw new Error("Falta nombre")
        if (!this.departamento) throw new Error("Falta departamento")
        if (!this.cargo) throw new Error("Falta cargo")
        if (!this.contrato) throw new Error("Falta contrato")
        if (!this.proyecto) throw new Error("Falta proyecto")
    }
}