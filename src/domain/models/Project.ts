export class Project {
    constructor(
        public titulo: string,
        public descripcion: string,
        public creadoEn: Date,
        public coordinadores: [],
        public empleadosDirectos: [],
        public contratistas: [],
        public id?: string
    ) { }
    validarDatos(): void {
        if (!this.titulo) throw new Error("Falta titulo de proyecto")
    }

}