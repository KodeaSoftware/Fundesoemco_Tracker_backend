export class Email {
    constructor(
        public correo: string,
        public nombre: string,
        public password: string
    ) { }

    validarDatos(): void {
        if (!this.correo) throw new Error("Falta correo electrónico")
        if (!this.nombre) throw new Error("Falta nombre de la persona")
        if (!this.password) throw new Error("Falta contraseña")

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.correo)) {
            throw new Error("Formato de correo electrónico inválido")
        }
    }

    generarMensaje(): string {
        return `Hola ${this.nombre}, aquí está tu contraseña para acceder a https://fundesoemcotrackerapp.up.railway.app/login por favor ingresa con el rol "Coordinador".\n\nFundesoemco Software, Automatizando procesos!`
    }
}
