import 'reflect-metadata';
import { sequelize } from '../src/infrastructure/persistence/database';
import { RecursosHumanosModel } from '../src/infrastructure/persistence/models/RecursosHumanosModel';
import bcrypt from 'bcrypt';
import 'dotenv/config';

async function createAdmin() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida.');

        const cedula = 10002000;
        const email = 'admin@fundesoemco.org';
        const password = 'admin123';
        const name = 'Admin RRHH';
        const cargo = 'Administrador';

        // Verificar si ya existe
        const existing = await RecursosHumanosModel.findOne({ where: { cedula } });
        if (existing) {
            console.log('El usuario ya existe.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await RecursosHumanosModel.create({
            cedula,
            nombre: name,
            cargo,
            correo: email,
            password: hashedPassword
        });

        console.log('-----------------------------------');
        console.log('Cuenta de Admin RRHH creada exitosamente:');
        console.log(`Correo: ${email}`);
        console.log(`Cédula: ${cedula}`);
        console.log(`Contraseña: ${password}`);
        console.log('-----------------------------------');

    } catch (error) {
        console.error('Error al crear el admin:', error);
    } finally {
        await sequelize.close();
    }
}

createAdmin();
