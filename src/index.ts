import 'reflect-metadata';
import { ensureDatabaseExists } from "./infrastructure/persistence/initDb";
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
import { initScheduler } from "./infrastructure/scheduler/dailyReport";

const app = express()

// Configurar CORS
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        // Permitir requests sin origen (como apps móviles, curl o herramientas internas)
        // o si coincide con los orígenes permitidos, o en desarrollo
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por política CORS: origen no permitido'));
        }
    },
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

const PORT = process.env.PORT || 4123;

// Función para inicializar las conexiones
const initializeConnections = async () => {
    try {
        // Asegurar que la base de datos existe
        await ensureDatabaseExists();

        // Conectar a PostgreSQL
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL establecida');

        // Sincronizar modelos con la base de datos
        // En producción NO se usa alter: true para evitar pérdida accidental de datos
        if (process.env.NODE_ENV === 'production') {
            await sequelize.sync();
            console.log('Modelos sincronizados en modo producción (protegido contra alteración de datos)');
        } else {
            await sequelize.sync({ alter: true });
            console.log('Modelos sincronizados en modo desarrollo (alter: true)');
        }

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
            initScheduler();
        });
    } catch (error) {
        console.error('Error al inicializar las conexiones:', error);
        process.exit(1);
    }
};

initializeConnections();
