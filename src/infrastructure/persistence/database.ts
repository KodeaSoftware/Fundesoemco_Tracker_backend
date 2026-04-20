import { Sequelize } from "sequelize-typescript";
import 'dotenv/config';
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL .env no definido');
}

if (!DATABASE_URL.startsWith('postgres://')) {
    throw new Error('DATABASE_URL debe comenzar con postgres://');
}

export const sequelize = new Sequelize(DATABASE_URL)

