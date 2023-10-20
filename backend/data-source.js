const process = require('node:process');
require('dotenv').config();
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

const Post = require('./db/entity/Post');
const Admin = require('./db/entity/Admin');
const Session = require('./db/entity/Session');

const { DataSource } = require('typeorm');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

console.log(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE);
const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Post, Admin, Session],
  synchronize: true,
  migrationsTableName: 'custom_migration_table',
  migrations: ['./src/db/migrations/*.js'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
  migrationsDir: './src/db/migrations',
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
});

module.exports.AppDataSource = AppDataSource;
