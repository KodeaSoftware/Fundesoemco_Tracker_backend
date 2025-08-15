import "./infrastructure/persistence/models/associations";
import express from "express"
import cors from "cors"
import { sequelize } from "./infrastructure/persistence/database";
import 'dotenv/config';
import EmployeeRoute from "./interfaces/routes/Employee.route";
import CoordinatorRoute from "./interfaces/routes/Coordinator.route";
import auth from "./interfaces/routes/Auth.route";
import ProjectRoute from "./interfaces/routes/Project.route";
import RecursosHumanosRoute from "./interfaces/routes/RecursosHumanos.route";
import employment from "./interfaces/routes/ContractTypes.route";

const app = express()

// Configurar CORS para permitir todos los orígenes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para express - DEBE ir ANTES de las rutas
app.use(express.json())

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "Servidor funcionando correctamente" });
});

// Rutas
app.use(EmployeeRoute)
app.use(CoordinatorRoute)
app.use(auth)
app.use(ProjectRoute)
app.use(RecursosHumanosRoute)
app.use(employment)
const PORT = process.env.PORT || 3000;

sequelize.authenticate() // PostgreSQL railway conection sequelize 

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




