import express from "express"
import { sequelize } from "./infrastructure/persistence/database";
import 'dotenv/config';
import EmployeeRoute from "./infrastructure/routes/Employee.route";

const app = express()
app.use(EmployeeRoute)

// Middleware para express 
app.use(express.json())

const PORT = process.env.PORT || 3000;

sequelize.authenticate() // PostgreSQL railway conection sequelize 

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




