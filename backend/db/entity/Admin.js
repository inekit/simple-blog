const { PrimaryGeneratedColumn, Generated } = require('typeorm');

var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Admin',
  tableName: 'admins',
  columns: {
    id: {
      primary: true,
      type: 'int',
      PrimaryGeneratedColumn: true,
      generated: true,
    },
    login: {
      type: 'varchar',
      length: 200,
      unique: true,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
});
