import { sequelize } from '../src/infrastructure/persistence/database';
import 'reflect-metadata';

async function fixSchema() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida.');

        // Cambiar el tipo de columna de INTEGER a VARCHAR
        // Usamos EXECUTING para correr SQL crudo
        console.log('Alterando tabla project...');
        await sequelize.query(`
            ALTER TABLE project 
            ADD COLUMN IF NOT EXISTS estado VARCHAR(255) DEFAULT 'activo' NOT NULL;
        `);
        
        console.log('Esquema actualizado correctamente.');
    } catch (error) {
        console.error('Error al actualizar el esquema:', error);
    } finally {
        await sequelize.close();
    }
}

fixSchema();
