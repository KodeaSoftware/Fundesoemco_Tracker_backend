import { sequelize } from './infrastructure/persistence/database';
import { ProjectAssignamentCoordinatorModel } from './infrastructure/persistence/models/ProjectAssignamentCoordinatorModel';

async function testQuery() {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB");
        const schema = await sequelize.getQueryInterface().describeTable('project_coordinator');
        console.log("Schema of project_coordinator:", schema);
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}
testQuery();
