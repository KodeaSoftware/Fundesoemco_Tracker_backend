import express from "express"
import { sequelize } from "./infrastructure/persistence/database";
import 'dotenv/config';
import EmployeeRoute from "./infrastructure/routes/Employee.route";

const app = express()

// Middleware para express - DEBE ir ANTES de las rutas
app.use(express.json())

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "Servidor funcionando correctamente" });
});

// Rutas
app.use(EmployeeRoute)

const PORT = process.env.PORT || 3000;

sequelize.authenticate() // PostgreSQL railway conection sequelize 

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




