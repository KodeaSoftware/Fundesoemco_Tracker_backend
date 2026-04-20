const { sequelize } = require('../src/infrastructure/persistence/database');

async function repairSchema() {
  try {
    await sequelize.authenticate();
    console.log('>>> [SCRATCH] Conectado a la base de datos.');

    console.log('>>> [SCRATCH] Alterando tabla project_coordinator...');
    await sequelize.query(`
      ALTER TABLE project_coordinator 
      ALTER COLUMN "idProject" TYPE UUID USING "idProject"::UUID,
      ALTER COLUMN "idCoordinator" TYPE UUID USING "idCoordinator"::UUID;
    `);
    console.log('>>> [SCRATCH] Tabla project_coordinator actualizada exitosamente.');

    console.log('>>> [SCRATCH] Alterando tabla project_employee...');
    try {
      await sequelize.query(`
        ALTER TABLE project_employee 
        ALTER COLUMN "idProject" TYPE UUID USING "idProject"::UUID,
        ALTER COLUMN "idEmployee" TYPE UUID USING "idEmployee"::UUID;
      `);
      console.log('>>> [SCRATCH] Tabla project_employee actualizada exitosamente.');
    } catch (e) {
      console.warn('>>> [SCRATCH] Advertencia al actualizar project_employee (posiblemente ya era UUID o no existe):', e.message);
    }

    console.log('>>> [SCRATCH] Reparación de esquema completada.');
    process.exit(0);
  } catch (err) {
    console.error('>>> [SCRATCH] ERROR FATAL reparando esquema:', err);
    process.exit(1);
  }
}

repairSchema();
