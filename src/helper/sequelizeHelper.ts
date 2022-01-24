import { Sequelize } from "sequelize";
import { Pool } from 'pg';
import pgtools from 'pgtools';
import config from '../config';

export const initDatabase = async () => {
  const { host, port, user, password, database } = config.database;
  const connection = await new Pool({ host, port, user, password });
  const query = `SELECT FROM pg_database WHERE datname = '${database}'`
  await connection.query(query)
    .then(async (res) => {
      if (res.rowCount === 0) {
        await pgtools.createdb({ 
          host, 
          port, 
          user, 
          password 
        }, database);
      }
    })
}

const sequelizeHelper = new Sequelize('node-complete', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost'
})


try {
  (async() => {
    await sequelizeHelper.authenticate();
  })
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelizeHelper;