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
import EmailRoute from "./interfaces/routes/Email.route";

const app = express()

// Configurar CORS para permitir todos los orígenes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


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
app.use(EmailRoute)
const PORT = process.env.PORT;

// Función para inicializar las conexiones
const initializeConnections = async () => {
    try {
        // Conectar a PostgreSQL
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL establecida');

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al inicializar las conexiones:', error);
        process.exit(1);
    }
};

initializeConnections();




