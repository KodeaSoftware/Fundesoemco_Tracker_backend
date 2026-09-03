import { Sequelize } from "sequelize-typescript";
import 'dotenv/config';
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL .env no definido');
}

if (!DATABASE_URL.startsWith('postgres://') && !DATABASE_URL.startsWith('postgresql://')) {
    throw new Error('DATABASE_URL debe comenzar con postgres:// o postgresql://');
}

export const sequelize = new Sequelize(DATABASE_URL);

