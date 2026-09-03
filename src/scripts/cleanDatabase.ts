import 'dotenv/config';
import { sequelize } from '../infrastructure/persistence/database';
import { RecursosHumanosModel } from '../infrastructure/persistence/models/RecursosHumanosModel';

/**
 * Script para limpiar la base de datos dejando únicamente los usuarios de RRHH.
 * Ideal para preparar la aplicación para despliegue en producción.
 */
async function cleanDatabase() {
    console.log('========================================================');
    console.log('🧹 INICIANDO LIMPIEZA DE BASE DE DATOS (PRE-PRODUCCIÓN)');
    console.log('========================================================');

    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a base de datos establecida.');

        // 1. Verificar usuarios RRHH existentes para no borrarlos
        const rrhhUsers = await RecursosHumanosModel.findAll({
            attributes: ['id', 'cedula', 'nombre', 'correo', 'cargo']
        });

        console.log(`\n🛡️  USUARIOS DE RRHH QUE SE MANTENDRÁN (${rrhhUsers.length}):`);
        rrhhUsers.forEach(u => {
            console.log(`   - ${u.getDataValue('nombre')} (${u.getDataValue('correo')}) - Cargo: ${u.getDataValue('cargo')}`);
        });

        if (rrhhUsers.length === 0) {
            console.warn('\n⚠️  ADVERTENCIA: No hay usuarios de RRHH en la tabla "rrhh".');
        }

        // 2. Ejecutar TRUNCATE en cascada para todas las tablas operativas
        console.log('\n🗑️  Vaciando tablas operativas...');

        const tablesToClean = [
            'employee_attendance',
            'project_employee',
            'project_coordinator',
            'employees',
            'coordinator',
            'project',
            'employment_contracts'
        ];

        for (const table of tablesToClean) {
            try {
                await sequelize.query(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
                console.log(`   ✓ Tabla "${table}" vaciada correctamente.`);
            } catch (err: any) {
                console.warn(`   ⚠️  No se pudo vaciar "${table}": ${err.message}`);
            }
        }

        // 3. Verificación final
        const finalRrhhCount = await RecursosHumanosModel.count();
        console.log('\n========================================================');
        console.log('✨ LIMPIEZA COMPLETADA CON ÉXITO');
        console.log(`🛡️  Usuarios RRHH preservados: ${finalRrhhCount}`);
        console.log('🚀 Base de datos lista para pruebas finales y producción.');
        console.log('========================================================');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante la limpieza de la base de datos:', error);
        process.exit(1);
    }
}

cleanDatabase();
